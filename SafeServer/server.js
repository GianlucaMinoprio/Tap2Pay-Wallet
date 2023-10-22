/*const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { EthersAdapter } = require('@safe-global/protocol-kit');
//const SafeApiKit = require('@safe-global/api-kit');
const SafeProtocolApiKit = require('@safe-global/api-kit');
const { SafeFactory } = require('@safe-global/protocol-kit');
const { SafeTransactionDataPartial } = require('@safe-global/safe-core-sdk-types');
const dotenv = require('dotenv');
*/

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
} = require('./utils_Safe.js');

const { getSafeService, getSafe } = require('./utils.js');

app.post('/propose-transaction', async (req, res) => {
  try {
    const { destination, amount } = req.body;
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const safeAddress = process.env.SAFE_ADDRESS;
    const safeSdkOwner = await getSafe(safeAddress, ownerSigner);
    const safeTransaction = await createTransaction(safeSdkOwner, destination, '0x', amount);
    const safeTxHash = await proposeTransaction(ownerSigner, safeSdkOwner, safeAddress, safeTransaction, await ownerSigner.getAddress());
    res.json({ safeTxHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});





/*

app.post('/propose-transaction', async (req, res) => {
  try {
    const { destination, amount } = req.body;
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    
    // Obtenez le safe existant
    const safeAddress = process.env.SAFE_ADDRESS;  // Supposons que l'adresse Safe soit stockée dans une variable d'environnement
    const safeSdkOwner = await getSafe(safeAddress, ownerSigner);
    
    const safeTransaction = await createTransaction(safeSdkOwner, destination, '0x', amount);
    const safeTxHash = await proposeTransaction(ownerSigner, safeSdkOwner, safeAddress, safeTransaction, await ownerSigner.getAddress());
    
    res.json({ safeTxHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const initSafe = async (req, res) => {
  try {
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    console.log('ownerSigner', ownerSigner);
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: ownerSigner
    });
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global';
    //const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner });
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


const proposeTransaction = async (req, res) => {
  try {
    console.log("Destination");
    console.log(req.body.destination);

    // ... Initialisation de safeService et safeSdkOwner comme dans initSafe ...
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: ownerSigner
    });
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global';

    const SafeApiKit = SafeProtocolApiKit.default;
    const safeService = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-goerli.safe.global',
      ethAdapterOwner,
    });

    // Utilisez votre adresse Safe existante pour initialiser safeSdkOwner
    const safeAddress = '0x461cB679D33DB911cB50A338860747E353D5E653';  // Remplacez par votre adresse Safe existante
    const safeSdkOwner = await Safe.create({
      ethAdapter: ethAdapterOwner,
      safeAddress,
    });

    console.log('safeSdkOwner', safeSdkOwner);

    const destination = req.body.destination; // Récupérez la destination du corps de la requête
    const amount = ethers.utils.parseUnits(req.body.amount, 'ether').toString();  // Récupérez le montant du corps de la requête
    const safeTransactionData = {
      to: destination,
      data: '0x',
      value: amount,
    };
    const safeTransaction = await safeSdkOwner.createTransaction({ safeTransactionData });
    const safeTxHash = await safeSdkOwner.getTransactionHash(safeTransaction);
    const senderSignature = await safeSdkOwner.signTransactionHash(safeTxHash);
    await safeService.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await ownerSigner.getAddress(),
      senderSignature: senderSignature.data,
    });
    res.json({ safeTxHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.post('/propose-transaction', proposeTransaction);
*/


/*

const getPendingTransactions = async (req, res) => {
  try {
    // ... Initialisation de safeService comme dans initSafe ...
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global';
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner });


    const pendingTransactions = await safeService.getPendingTransactions(safeAddress).results;
    res.json({ pendingTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.get('/pending-transactions', getPendingTransactions);


const executeTransaction = async (req, res) => {
  try {
    // ... Initialisation de safeService et safeSdkOwner comme dans initSafe ...
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: ownerSigner
    });
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global';
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner });
    const safeSdkOwner = await SafeFactory.create({ ethAdapter: ethAdapterOwner });


    const safeTxHash = req.body.safeTxHash;  // Obtenez safeTxHash à partir de la requête
    const safeTransaction = await safeService.getTransaction(safeTxHash);
    const executeTxResponse = await safeSdkOwner.executeTransaction(safeTransaction);
    const receipt = await executeTxResponse.transactionResponse?.wait();
    res.json({ transactionHash: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.post('/execute-transaction', executeTransaction);

const confirmTransaction = async (req, res) => {
  try {
    // ... Initialisation de safeSdkOwner comme dans initSafe ...
    const ownerSigner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const ethAdapterOwner = new EthersAdapter({
      ethers,
      signerOrProvider: ownerSigner
    });
    const safeSdkOwner = await SafeFactory.create({ ethAdapter: ethAdapterOwner });



    const afterBalance = await safeSdkOwner.getBalance();
    res.json({ finalBalance: ethers.utils.formatUnits(afterBalance, 'ether') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.get('/confirm-transaction', confirmTransaction);
*/

