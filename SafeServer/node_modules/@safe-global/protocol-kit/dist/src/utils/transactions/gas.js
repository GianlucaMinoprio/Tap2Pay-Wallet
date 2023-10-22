"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateSafeDeploymentGas = exports.estimateSafeTxGas = exports.estimateTxBaseGas = exports.estimateTxGas = exports.estimateGas = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const safe_core_sdk_types_1 = require("@safe-global/safe-core-sdk-types");
const satisfies_1 = __importDefault(require("semver/functions/satisfies"));
const constants_1 = require("../constants");
const safeDeploymentContracts_1 = require("../../contracts/safeDeploymentContracts");
// Every byte == 00 -> 4  Gas cost
const CALL_DATA_ZERO_BYTE_GAS_COST = 4;
// Every byte != 00 -> 16 Gas cost (68 before Istanbul)
const CALL_DATA_BYTE_GAS_COST = 16;
// gas cost initialization of a Safe
const INITIZATION_GAS_COST = 20000;
// increment nonce gas cost
const INCREMENT_NONCE_GAS_COST = 5000;
// Keccak gas cost for the hash of the Safe transaction
const HASH_GENERATION_GAS_COST = 1500;
// ecrecover gas cost for ecdsa ~= 4K gas, we use 6K
const ECRECOVER_GAS_COST = 6000;
// transfer gas cost
const TRANSAFER_GAS_COST = 32000;
// numbers < 256 (0x00(31*2)..ff) are 192 -> 31 * 4 + 1 * CALL_DATA_BYTE_GAS_COST
// numbers < 65535 (0x(30*2)..ffff) are 256 -> 30 * 4 + 2 * CALL_DATA_BYTE_GAS_COST
// Calculate gas for signatures
// (array count (3 -> r, s, v) + ecrecover costs) * signature count
const GAS_COST_PER_SIGNATURE = 1 * CALL_DATA_BYTE_GAS_COST + 2 * 32 * CALL_DATA_BYTE_GAS_COST + ECRECOVER_GAS_COST;
function estimateDataGasCosts(data) {
    const bytes = data.match(/.{2}/g);
    return bytes.reduce((gasCost, currentByte) => {
        if (currentByte === '0x') {
            return gasCost + 0;
        }
        if (currentByte === '00') {
            return gasCost + CALL_DATA_ZERO_BYTE_GAS_COST;
        }
        return gasCost + CALL_DATA_BYTE_GAS_COST;
    }, 0);
}
async function estimateGas(safeVersion, safeContract, ethAdapter, to, valueInWei, data, operation, customContracts) {
    const chainId = await ethAdapter.getChainId();
    const simulateTxAccessorContract = await (0, safeDeploymentContracts_1.getSimulateTxAccessorContract)({
        ethAdapter,
        safeVersion,
        customContracts: customContracts?.[chainId]
    });
    const transactionDataToEstimate = simulateTxAccessorContract.encode('simulate', [
        to,
        valueInWei,
        data,
        operation
    ]);
    const safeFunctionToEstimate = safeContract.encode('simulateAndRevert', [
        await simulateTxAccessorContract.getAddress(),
        transactionDataToEstimate
    ]);
    const safeAddress = safeContract.getAddress();
    const transactionToEstimateGas = {
        to: safeAddress,
        value: '0',
        data: safeFunctionToEstimate,
        from: safeAddress
    };
    try {
        const encodedResponse = await ethAdapter.call(transactionToEstimateGas);
        return Number('0x' + encodedResponse.slice(184).slice(0, 10)).toString();
    }
    catch (error) {
        return parseSafeTxGasErrorResponse(error);
    }
}
exports.estimateGas = estimateGas;
async function estimateTxGas(safeContract, ethAdapter, to, valueInWei, data, operation) {
    let txGasEstimation = bignumber_1.BigNumber.from(0);
    const safeAddress = safeContract.getAddress();
    const estimateData = safeContract.encode('requiredTxGas', [
        to,
        valueInWei,
        data,
        operation
    ]);
    try {
        const estimateResponse = await ethAdapter.estimateGas({
            to: safeAddress,
            from: safeAddress,
            data: estimateData
        });
        txGasEstimation = bignumber_1.BigNumber.from('0x' + estimateResponse.substring(138)).add(10000);
    }
    catch (error) { }
    if (txGasEstimation.gt(0)) {
        const dataGasEstimation = estimateDataGasCosts(estimateData);
        let additionalGas = 10000;
        for (let i = 0; i < 10; i++) {
            try {
                const estimateResponse = await ethAdapter.call({
                    to: safeAddress,
                    from: safeAddress,
                    data: estimateData,
                    gasPrice: '0',
                    gasLimit: txGasEstimation.add(dataGasEstimation).add(additionalGas).toString()
                });
                if (estimateResponse !== '0x') {
                    break;
                }
            }
            catch (error) { }
            txGasEstimation = txGasEstimation.add(additionalGas);
            additionalGas *= 2;
        }
        return txGasEstimation.add(additionalGas).toString();
    }
    try {
        const estimateGas = await ethAdapter.estimateGas({
            to,
            from: safeAddress,
            value: valueInWei,
            data
        });
        return estimateGas;
    }
    catch (error) {
        if (operation === safe_core_sdk_types_1.OperationType.DelegateCall) {
            return '0';
        }
        return Promise.reject(error);
    }
}
exports.estimateTxGas = estimateTxGas;
/**
 * This function estimates the baseGas of a Safe transaction.
 * The baseGas includes costs for:
 * - Generation of the Safe transaction hash (txHash)
 * - Increasing the nonce of the Safe
 * - Verifying the signatures of the Safe transaction
 * - Payment to relayers for executing the transaction
 * - Emitting events ExecutionSuccess or ExecutionFailure
 *
 * Note: it does not include the transaction execution cost (safeTxGas)
 *
 * @async
 * @function estimateTxBaseGas
 * @param {Safe} safe - The Safe instance containing all the information about the safe.
 * @param {SafeTransaction} safeTransaction - The transaction for which the baseGas is to be estimated.
 * @returns {Promise<string>} A Promise that resolves with the estimated baseGas as a string.
 */
async function estimateTxBaseGas(safe, safeTransaction) {
    const safeTransactionData = safeTransaction.data;
    const { to, value, data, operation, safeTxGas, gasToken, refundReceiver } = safeTransactionData;
    const safeThreshold = await safe.getThreshold();
    const safeNonce = await safe.getNonce();
    const signaturesGasCost = safeThreshold * GAS_COST_PER_SIGNATURE;
    const encodeSafeTxGas = safeTxGas || 0;
    const encodeBaseGas = 0;
    const gasPrice = 1;
    const encodeGasToken = gasToken || constants_1.ZERO_ADDRESS;
    const encodeRefundReceiver = refundReceiver || constants_1.ZERO_ADDRESS;
    const signatures = '0x';
    const safeVersion = await safe.getContractVersion();
    const ethAdapter = safe.getEthAdapter();
    const isL1SafeMasterCopy = safe.getContractManager().isL1SafeMasterCopy;
    const chainId = await safe.getChainId();
    const customContracts = safe.getContractManager().contractNetworks?.[chainId];
    const safeSingletonContract = await (0, safeDeploymentContracts_1.getSafeContract)({
        ethAdapter,
        safeVersion,
        isL1SafeMasterCopy,
        customContracts
    });
    const execTransactionData = safeSingletonContract.encode('execTransaction', [
        to,
        value,
        data,
        operation,
        encodeSafeTxGas,
        encodeBaseGas,
        gasPrice,
        encodeGasToken,
        encodeRefundReceiver,
        signatures
    ]);
    // If nonce == 0, nonce storage has to be initialized
    const isSafeInitialized = safeNonce !== 0;
    const incrementNonceGasCost = isSafeInitialized ? INCREMENT_NONCE_GAS_COST : INITIZATION_GAS_COST;
    let baseGas = signaturesGasCost +
        estimateDataGasCosts(execTransactionData) +
        incrementNonceGasCost +
        HASH_GENERATION_GAS_COST;
    // Add additional gas costs
    baseGas > 65536 ? (baseGas += 64) : (baseGas += 128);
    // Base tx costs, transfer costs...
    baseGas += TRANSAFER_GAS_COST;
    return baseGas.toString();
}
exports.estimateTxBaseGas = estimateTxBaseGas;
/**
 * This function estimates the safeTxGas of a Safe transaction.
 * The safeTxGas value represents the amount of gas required to execute the Safe transaction itself.
 * It does not include costs such as signature verification, transaction hash generation, nonce incrementing, and so on.
 *
 * The estimation method differs based on the version of the Safe:
 * - For versions >= 1.3.0, the simulate function defined in the simulateTxAccessor.sol Contract is used.
 * - For versions < 1.3.0, the deprecated requiredTxGas method defined in the GnosisSafe.sol contract is used.
 *
 * @async
 * @function estimateSafeTxGas
 * @param {Safe} safe - The Safe instance containing all the necessary information about the safe.
 * @param {SafeTransaction} safeTransaction - The transaction for which the safeTxGas is to be estimated.
 * @returns {Promise<string>} A Promise that resolves with the estimated safeTxGas as a string.
 *
 */
async function estimateSafeTxGas(safe, safeTransaction) {
    const safeVersion = await safe.getContractVersion();
    if ((0, satisfies_1.default)(safeVersion, '>=1.3.0')) {
        const safeTxGas = await estimateSafeTxGasWithSimulate(safe, safeTransaction);
        return addExtraGasForSafety(safeTxGas);
    }
    // deprecated method to estimate the safeTxGas of a Safe transaction
    const safeTxGas = await estimateSafeTxGasWithRequiredTxGas(safe, safeTransaction);
    return addExtraGasForSafety(safeTxGas);
}
exports.estimateSafeTxGas = estimateSafeTxGas;
/**
 * Increase the given safeTxGas gas amount by 5% as a security margin to avoid running out of gas.
 * In some contexts, the safeTxGas might be underestimated, leading to 'out of gas' errors during the Safe transaction execution
 *
 * @param {string} safeTxGas - The original safeTxGas gas amount.
 * @returns {string} The new safeTxGas gas amount, increased by 5% rounded.
 */
function addExtraGasForSafety(safeTxGas) {
    const INCREASE_GAS_FACTOR = 1.05; // increase the gas by 5% as a security margin
    return Math.round(Number(safeTxGas) * INCREASE_GAS_FACTOR).toString();
}
/**
 * This function estimates the safeTxGas of a Safe transaction.
 * Using the deprecated method of requiredTxGas defined in the GnosisSafe contract. This method is meant to be used for Safe versions < 1.3.0.
 * see: https://github.com/safe-global/safe-contracts/blob/v1.2.0/contracts/GnosisSafe.sol#L276
 *
 * @async
 * @function estimateSafeTxGasWithRequiredTxGas
 * @param {Safe} safe - The Safe instance containing all the necessary information about the safe.
 * @param {SafeTransaction} safeTransaction - The transaction for which the safeTxGas is to be estimated.
 * @returns {Promise<string>} A Promise that resolves with the estimated safeTxGas as a string.
 *
 */
async function estimateSafeTxGasWithRequiredTxGas(safe, safeTransaction) {
    const isSafeDeployed = await safe.isSafeDeployed();
    const safeAddress = await safe.getAddress();
    const safeVersion = await safe.getContractVersion();
    const ethAdapter = safe.getEthAdapter();
    const isL1SafeMasterCopy = safe.getContractManager().isL1SafeMasterCopy;
    const chainId = await safe.getChainId();
    const customContracts = safe.getContractManager().contractNetworks?.[chainId];
    const safeSingletonContract = await (0, safeDeploymentContracts_1.getSafeContract)({
        ethAdapter,
        safeVersion,
        isL1SafeMasterCopy,
        customContracts
    });
    const transactionDataToEstimate = safeSingletonContract.encode('requiredTxGas', [
        safeTransaction.data.to,
        safeTransaction.data.value,
        safeTransaction.data.data,
        safeTransaction.data.operation
    ]);
    const to = isSafeDeployed ? safeAddress : safeSingletonContract.getAddress();
    const transactionToEstimateGas = {
        to,
        value: '0',
        data: transactionDataToEstimate,
        from: safeAddress
    };
    try {
        const encodedResponse = await ethAdapter.call(transactionToEstimateGas);
        const safeTxGas = '0x' + encodedResponse.slice(-32);
        return safeTxGas;
        // if the call throws an error we try to parse the returned value
    }
    catch (error) {
        try {
            const revertData = JSON.parse(error.error.body).error.data;
            if (revertData && revertData.startsWith('Reverted ')) {
                const [, safeTxGas] = revertData.split('Reverted ');
                return Number(safeTxGas).toString();
            }
        }
        catch {
            return '0';
        }
    }
    return '0';
}
// TO-DO: Improve decoding
/*
  const simulateAndRevertResponse = ethAdapter.decodeParameters(
    ['bool', 'bytes'],
    encodedResponse
  )
  const returnedData = ethAdapter.decodeParameters(['uint256', 'bool', 'bytes'], simulateAndRevertResponse[1])
  */
function decodeSafeTxGas(encodedSafeTxGas) {
    return Number('0x' + encodedSafeTxGas.slice(184).slice(0, 10)).toString();
}
function parseSafeTxGasErrorResponse(error) {
    // Ethers
    if (error?.error?.body) {
        const revertData = JSON.parse(error.error.body).error.data;
        if (revertData && revertData.startsWith('Reverted ')) {
            const [, encodedResponse] = revertData.split('Reverted ');
            const safeTxGas = decodeSafeTxGas(encodedResponse);
            return safeTxGas;
        }
    }
    // Web3
    const [, encodedResponse] = error.message.split('return data: ');
    const safeTxGas = decodeSafeTxGas(encodedResponse);
    return safeTxGas;
}
/**
 * This function estimates the safeTxGas of a Safe transaction.
 * It uses the simulate function defined in the SimulateTxAccessor contract. This method is meant to be used for Safe versions >= 1.3.0.
 *
 * @async
 * @function estimateSafeTxGasWithSimulate
 * @param {Safe} safe - The Safe instance containing all the necessary information about the safe.
 * @param {SafeTransaction} safeTransaction - The transaction for which the safeTxGas is to be estimated.
 * @returns {Promise<string>} A Promise that resolves with the estimated safeTxGas as a string.
 *
 */
async function estimateSafeTxGasWithSimulate(safe, safeTransaction) {
    const isSafeDeployed = await safe.isSafeDeployed();
    const safeAddress = await safe.getAddress();
    const safeVersion = await safe.getContractVersion();
    const ethAdapter = safe.getEthAdapter();
    const chainId = await safe.getChainId();
    const customContracts = safe.getContractManager().contractNetworks?.[chainId];
    const isL1SafeMasterCopy = safe.getContractManager().isL1SafeMasterCopy;
    const safeSingletonContract = await (0, safeDeploymentContracts_1.getSafeContract)({
        ethAdapter,
        safeVersion,
        isL1SafeMasterCopy,
        customContracts
    });
    // new version of the estimation
    const simulateTxAccessorContract = await (0, safeDeploymentContracts_1.getSimulateTxAccessorContract)({
        ethAdapter,
        safeVersion,
        customContracts
    });
    const transactionDataToEstimate = simulateTxAccessorContract.encode('simulate', [
        safeTransaction.data.to,
        safeTransaction.data.value,
        safeTransaction.data.data,
        safeTransaction.data.operation
    ]);
    // if the Safe is not deployed we can use the singleton address to simulate
    const to = isSafeDeployed ? safeAddress : safeSingletonContract.getAddress();
    const safeFunctionToEstimate = safeSingletonContract.encode('simulateAndRevert', [
        await simulateTxAccessorContract.getAddress(),
        transactionDataToEstimate
    ]);
    const transactionToEstimateGas = {
        to,
        value: '0',
        data: safeFunctionToEstimate,
        from: safeAddress
    };
    try {
        const encodedResponse = await ethAdapter.call(transactionToEstimateGas);
        const safeTxGas = decodeSafeTxGas(encodedResponse);
        return safeTxGas;
        // if the call throws an error we try to parse the returned value
    }
    catch (error) {
        return parseSafeTxGasErrorResponse(error);
    }
    return '0';
}
/**
 * This function estimates the gas cost of deploying a Safe.
 * It considers also the costs of the Safe setup call.
 * The setup call includes tasks such as setting up initial owners, defining the threshold, and initializing the salt nonce used for address generation.
 *
 * @async
 * @function estimateSafeDeploymentGas
 * @param {Safe} safe - The Safe object containing all necessary information about the safe, including owners, threshold, and saltNonce.
 * @returns {Promise<string>} A Promise that resolves with the estimated gas cost of the safe deployment as a string.
 */
async function estimateSafeDeploymentGas(safe) {
    const isSafeDeployed = await safe.isSafeDeployed();
    if (isSafeDeployed) {
        return '0';
    }
    const ethAdapter = safe.getEthAdapter();
    const safeDeploymentTransaction = await safe.createSafeDeploymentTransaction();
    const estimation = await ethAdapter.estimateGas({
        ...safeDeploymentTransaction,
        from: constants_1.ZERO_ADDRESS // if we use the Safe address the estimation always fails due to CREATE2
    });
    return estimation;
}
exports.estimateSafeDeploymentGas = estimateSafeDeploymentGas;
//# sourceMappingURL=gas.js.map