const SafeApiKit = require("@safe-global/api-kit").default;
const { Safe, EthersAdapter } = require("@safe-global/protocol-kit");
const { ethers, Signer } = require("ethers");

const txServiceUrl = 'https://safe-transaction-goerli.safe.global';

const getSafe = async (safeAddress, signerOrProvider) => {
    const ethAdapterOwner = new EthersAdapter({
        ethers,
        signerOrProvider: signerOrProvider
    });
    return await Safe.create({
        ethAdapter: ethAdapterOwner,
        safeAddress
    });
}

const getSafeService = (signerOrProvider) => {
    const ethAdapterOwner = new EthersAdapter({
        ethers,
        signerOrProvider: signerOrProvider
    });
    return new SafeApiKit({txServiceUrl, ethAdapter: ethAdapterOwner});
}

module.exports = {
    getSafe,
    getSafeService
};
