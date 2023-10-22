const {
    SafeMultisigTransactionListResponse,
    SignatureResponse,
  } = require("@safe-global/api-kit");
  
  const {
    Safe,
    EthersAdapter,
    SafeAccountConfig,
    SafeFactory,
  } = require("@safe-global/protocol-kit");
  
  const {
    SafeMultisigTransactionResponse,
    SafeTransaction,
    SafeTransactionDataPartial,
  } = require("@safe-global/safe-core-sdk-types");
  
  const { ContractReceipt, ethers, Signer } = require("ethers");
  const { TransactionReceipt } = require("web3-core");
  
  const { getSafe, getSafeService } = require("./utils");
  
  const deploySafe = async (
    signerOrProvider,
    addresses
  ) => {
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: signerOrProvider,
    });
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner });
    const safeAccountConfig = {
      owners: addresses,
      threshold: Math.ceil(addresses.length / 2),
    };
  
    return await safeFactory.deploySafe({
      safeAccountConfig,
      saltNonce: Date.now().toString(),
    });
  };
  
  const createTransaction = async (
    safeSdkOwner,
    to,
    data,
    amount
  ) => {
    const safeTransactionData = {
      data,
      to,
      value: amount ? ethers.utils.parseUnits(amount, "ether").toString() : "0",
    };
    return await safeSdkOwner.createTransaction({ safeTransactionData });
  };
  
  const proposeTransaction = async (
    signerOrProvider,
    safeSdkOwner,
    safeAddress,
    safeTx,
    senderAddress
  ) => {
    const safeTxHash = await safeSdkOwner.getTransactionHash(safeTx);
    const senderSignature = await safeSdkOwner.signTransactionHash(safeTxHash);
    const safeService = getSafeService(signerOrProvider);
    await safeService.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTx.data,
      safeTxHash,
      senderAddress,
      senderSignature: senderSignature.data,
    });
    return safeTxHash;
  };
  
  const confirmTransaction = async (
    safeTxHash,
    signerOrProvider,
    safeAddress
  ) => {
    const safeSdkOwner = await getSafe(safeAddress, signerOrProvider);
    const safeService = getSafeService(signerOrProvider);
  
    const signature = await safeSdkOwner.signTransactionHash(safeTxHash);
    return await safeService.confirmTransaction(safeTxHash, signature.data);
  };
  
  const executeTransaction = async (
    safeTxHash,
    signerOrProvider,
    safeAddress
  ) => {
    const safeService = getSafeService(signerOrProvider);
    const safeSdkOwner = await getSafe(safeAddress, signerOrProvider);
    const safeTransaction = await safeService.getTransaction(safeTxHash);
    const executeTxResponse = await safeSdkOwner.executeTransaction(
      safeTransaction,
    );
    return await executeTxResponse.transactionResponse?.wait();
  };
  
  const getPendingTransactions = async (
    signerOrProvider,
    safeAddress
  ) => {
    const safeService = getSafeService(signerOrProvider);
    return await safeService.getPendingTransactions(safeAddress);
  };
  
  const getTransaction = async (
    signerOrProvider,
    txnHash
  ) => {
    const safeService = getSafeService(signerOrProvider);
    return await safeService.getTransaction(txnHash);
  };
  
  const getOwners = async (
    safeAddress,
    signerOrProvider
  ) => {
    const safeSdkOwner = await getSafe(safeAddress, signerOrProvider);
    return await safeSdkOwner.getOwners();
  };
  
  const getSafesByOwner = async (
    signerOrProvider,
    address
  ) => {
    const safeService = getSafeService(signerOrProvider);
    return (await safeService.getSafesByOwner(address)).safes;
  };
  
  module.exports = {
    deploySafe,
    createTransaction,
    proposeTransaction,
    confirmTransaction,
    executeTransaction,
    getPendingTransactions,
    getTransaction,
    getOwners,
    getSafesByOwner,
  };
  