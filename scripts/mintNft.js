require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const data = require('../build/contracts/ArtCertificate.json');
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;
const mnemonic = process.env.MNEMONIC;
const getClientURL = (network) => {
  if (network === "rinkeby")
    return process.env.CLIENT_URL_RINKEBY;
  if (network === "mumbai")
    return process.env.CLIENT_URL_MUMBAI;
  if (network === "matic")
    return process.env.CLIENT_URL_MATIC;
}

const provider = new HDWalletProvider(mnemonic, getClientURL("mumbai"));
const web3 = new Web3(provider);

async function mintNFT() {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('accounts:', accounts);
    console.log('contract_address', contract_address);
    const artCertificate = new web3.eth.Contract(abiArray, contract_address);
    await artCertificate.methods
      .claimItem(
        'https://ipfs.io/ipfs/QmREBUVuoeX39eB9KiQjp25RFr2dhYF6zawpYXq1UPJXEz'
      )
      .send({ from: accounts[0] });
    console.log('Successfully minted NFT');
    // https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-balanceOf-address-
    // returns number of NFT's in owner's account
    const balance = await artCertificate.methods.balanceOf(accounts[0]).call();
    const owner = await artCertificate.methods.ownerOf(balance).call();
    console.log('balance: ', balance);
    console.log('owner: ', owner);
  } catch (err) {
    console.log('error occured while calling deployed contract:', err);
  }
}

mintNFT();
