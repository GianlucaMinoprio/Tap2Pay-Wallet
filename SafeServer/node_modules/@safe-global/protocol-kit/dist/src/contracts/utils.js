"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSafeDeploymentConfig = exports.validateSafeAccountConfig = exports.predictSafeAddress = exports.encodeSetupCallData = exports.encodeCreateProxyWithNonce = exports.PREDETERMINED_SALT_NONCE = void 0;
const address_1 = require("@ethersproject/address");
const bignumber_1 = require("@ethersproject/bignumber");
const config_1 = require("../contracts/config");
const constants_1 = require("../utils/constants");
const memoized_1 = require("../utils/memoized");
const ethereumjs_util_1 = require("ethereumjs-util");
const satisfies_1 = __importDefault(require("semver/functions/satisfies"));
const zksync_web3_1 = require("zksync-web3");
const safeDeploymentContracts_1 = require("../contracts/safeDeploymentContracts");
// keccak256(toUtf8Bytes('Safe Account Abstraction'))
exports.PREDETERMINED_SALT_NONCE = '0xb1073742015cbcf5a3a4d9d1ae33ecf619439710b89475f92e2abd2117e90f90';
const ZKSYNC_MAINNET = 324;
const ZKSYNC_TESTNET = 280;
// For bundle size efficiency we store SafeProxy.sol/GnosisSafeProxy.sol zksync bytecode hash in hex.
// To get the values below we need to:
// 1. Compile Safe smart contracts for zksync
// 2. Get `deployedBytecode` from SafeProxy.json/GnosisSafeProxy.json
// 3. Use zksync-web3 SDK to get the bytecode hash
//    const bytecodeHash = zkSyncUtils.hashBytecode(${deployedBytecode})
// 4. Use ethers to convert the array into hex
//    const deployedBytecodeHash = ethers.utils.hexlify(bytecodeHash)
const ZKSYNC_SAFE_PROXY_DEPLOYED_BYTECODE = {
    '1.3.0': {
        deployedBytecodeHash: '0x0100004124426fb9ebb25e27d670c068e52f9ba631bd383279a188be47e3f86d'
    }
};
function encodeCreateProxyWithNonce(safeProxyFactoryContract, safeSingletonAddress, initializer) {
    return safeProxyFactoryContract.encode('createProxyWithNonce', [
        safeSingletonAddress,
        initializer,
        exports.PREDETERMINED_SALT_NONCE
    ]);
}
exports.encodeCreateProxyWithNonce = encodeCreateProxyWithNonce;
const memoizedGetCompatibilityFallbackHandlerContract = (0, memoized_1.createMemoizedFunction)(safeDeploymentContracts_1.getCompatibilityFallbackHandlerContract);
async function encodeSetupCallData({ ethAdapter, safeAccountConfig, safeContract, customContracts, customSafeVersion }) {
    const { owners, threshold, to = constants_1.ZERO_ADDRESS, data = constants_1.EMPTY_DATA, fallbackHandler, paymentToken = constants_1.ZERO_ADDRESS, payment = 0, paymentReceiver = constants_1.ZERO_ADDRESS } = safeAccountConfig;
    const safeVersion = customSafeVersion || (await safeContract.getVersion());
    if ((0, satisfies_1.default)(safeVersion, '<=1.0.0')) {
        return safeContract.encode('setup', [
            owners,
            threshold,
            to,
            data,
            paymentToken,
            payment,
            paymentReceiver
        ]);
    }
    let fallbackHandlerAddress = fallbackHandler;
    const isValidAddress = fallbackHandlerAddress !== undefined && (0, address_1.isAddress)(fallbackHandlerAddress);
    if (!isValidAddress) {
        const fallbackHandlerContract = await memoizedGetCompatibilityFallbackHandlerContract({
            ethAdapter,
            safeVersion,
            customContracts
        });
        fallbackHandlerAddress = fallbackHandlerContract.getAddress();
    }
    return safeContract.encode('setup', [
        owners,
        threshold,
        to,
        data,
        fallbackHandlerAddress,
        paymentToken,
        payment,
        paymentReceiver
    ]);
}
exports.encodeSetupCallData = encodeSetupCallData;
const memoizedGetProxyFactoryContract = (0, memoized_1.createMemoizedFunction)(safeDeploymentContracts_1.getProxyFactoryContract);
const memoizedGetSafeContract = (0, memoized_1.createMemoizedFunction)(safeDeploymentContracts_1.getSafeContract);
const memoizedGetProxyCreationCode = (0, memoized_1.createMemoizedFunction)(async ({ ethAdapter, safeVersion, customContracts }) => {
    const safeProxyFactoryContract = await memoizedGetProxyFactoryContract({
        ethAdapter,
        safeVersion,
        customContracts
    });
    return safeProxyFactoryContract.proxyCreationCode();
});
async function predictSafeAddress({ ethAdapter, safeAccountConfig, safeDeploymentConfig = {}, isL1SafeMasterCopy = false, customContracts }) {
    (0, exports.validateSafeAccountConfig)(safeAccountConfig);
    (0, exports.validateSafeDeploymentConfig)(safeDeploymentConfig);
    const { safeVersion = config_1.DEFAULT_SAFE_VERSION, saltNonce = exports.PREDETERMINED_SALT_NONCE } = safeDeploymentConfig;
    const safeProxyFactoryContract = await memoizedGetProxyFactoryContract({
        ethAdapter,
        safeVersion,
        customContracts
    });
    const proxyCreationCode = await memoizedGetProxyCreationCode({
        ethAdapter,
        safeVersion,
        customContracts
    });
    const safeContract = await memoizedGetSafeContract({
        ethAdapter,
        safeVersion,
        isL1SafeMasterCopy,
        customContracts
    });
    const initializer = await encodeSetupCallData({
        ethAdapter,
        safeAccountConfig,
        safeContract,
        customContracts,
        customSafeVersion: safeVersion // it is more efficient if we provide the safeVersion manually
    });
    const encodedNonce = (0, ethereumjs_util_1.toBuffer)(ethAdapter.encodeParameters(['uint256'], [saltNonce])).toString('hex');
    const salt = (0, ethereumjs_util_1.keccak256)((0, ethereumjs_util_1.toBuffer)('0x' + (0, ethereumjs_util_1.keccak256)((0, ethereumjs_util_1.toBuffer)(initializer)).toString('hex') + encodedNonce));
    const input = ethAdapter.encodeParameters(['address'], [safeContract.getAddress()]);
    const chainId = await ethAdapter.getChainId();
    // zkSync Era counterfactual deployment is calculated differently
    // https://era.zksync.io/docs/reference/architecture/differences-with-ethereum.html#create-create2
    if ([ZKSYNC_MAINNET, ZKSYNC_TESTNET].includes(chainId)) {
        const bytecodeHash = ZKSYNC_SAFE_PROXY_DEPLOYED_BYTECODE[safeVersion].deployedBytecodeHash;
        return zksync_web3_1.utils.create2Address(safeProxyFactoryContract.getAddress(), bytecodeHash, salt, input);
    }
    const constructorData = (0, ethereumjs_util_1.toBuffer)(input).toString('hex');
    const initCode = proxyCreationCode + constructorData;
    const proxyAddress = '0x' +
        (0, ethereumjs_util_1.generateAddress2)((0, ethereumjs_util_1.toBuffer)(safeProxyFactoryContract.getAddress()), (0, ethereumjs_util_1.toBuffer)(salt), (0, ethereumjs_util_1.toBuffer)(initCode)).toString('hex');
    return ethAdapter.getChecksummedAddress(proxyAddress);
}
exports.predictSafeAddress = predictSafeAddress;
const validateSafeAccountConfig = ({ owners, threshold }) => {
    if (owners.length <= 0)
        throw new Error('Owner list must have at least one owner');
    if (threshold <= 0)
        throw new Error('Threshold must be greater than or equal to 1');
    if (threshold > owners.length)
        throw new Error('Threshold must be lower than or equal to owners length');
};
exports.validateSafeAccountConfig = validateSafeAccountConfig;
const validateSafeDeploymentConfig = ({ saltNonce }) => {
    if (saltNonce && bignumber_1.BigNumber.from(saltNonce).lt(0))
        throw new Error('saltNonce must be greater than or equal to 0');
};
exports.validateSafeDeploymentConfig = validateSafeDeploymentConfig;
//# sourceMappingURL=utils.js.map