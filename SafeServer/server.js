const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { EthersAdapter } = require('@safe-global/protocol-kit');
const SafeProtocolApiKit = require('@safe-global/api-kit');
const { SafeFactory } = require('@safe-global/protocol-kit');
const { SafeTransactionDataPartial } = require('@safe-global/safe-core-sdk-types');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.public.blastapi.io');

const initSafe = async (req, res) => {
  try {
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    console.log('ownerSigner', ownerSigner);
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: ownerSigner
    });
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global';
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner });
    const safeAccountConfig = {
      owners: [await ownerSigner.getAddress()],
      threshold: 1,
    };
    const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig });
    const safeAddress = await safeSdkOwner.getAddress();
    res.json({ safeAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.post('/init-safe', initSafe);

const { Safe } = require('@safe-global/protocol-kit');

const {
  deploySafe,
  createTransaction,
  proposeTransaction,
  getTransaction,
  getOwners,
  getSafesByOwner,
  confirmTransaction,
  executeTransaction,
} = require('./utils_Safe.js');

const { getSafeService, getSafe } = require('./utils.js');

/*

app.post('/propose-transaction', async (req, res) => {
  try {
    const { destination, amount } = req.body;
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const safeAddress = process.env.SAFE_ADDRESS;
    console.log('safeAddress', safeAddress);
    const safeSdkOwner = await getSafe(safeAddress, ownerSigner);
    console.log('safeSdkOwner', safeSdkOwner);
    const safeTransaction = await createTransaction(safeSdkOwner, destination, '0x', amount);
    const safeTxHash = await proposeTransaction(ownerSigner, safeSdkOwner, safeAddress, safeTransaction, await ownerSigner.getAddress());
    res.json({ safeTxHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

app.post('/propose-transaction', async (req, res) => {
  try {
    const { destination, amount } = req.body;

    // 1. Préparation de la transaction
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const safeAddress = process.env.SAFE_ADDRESS;
    const safeSdkOwner = await getSafe(safeAddress, ownerSigner);
    const safeTransaction = await createTransaction(safeSdkOwner, destination, '0x', amount);
    
    // 2. Proposition de la transaction
    const safeTxHash = await proposeTransaction(ownerSigner, safeSdkOwner, safeAddress, safeTransaction, await ownerSigner.getAddress());
    console.log('safeTxHash', safeTxHash);

    // 3. Confirmation de la transaction
    await confirmTransaction(safeTxHash, ownerSigner, safeAddress);
    console.log('Transaction confirmed');

    // 4. Exécution de la transaction
    const receipt = await executeTransaction(safeTxHash, ownerSigner, safeAddress);
    
    res.json({
      safeTxHash,
      transactionReceipt: receipt.transactionHash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});
