# NFT Demo

This project creates a smart contract and then deploys it to Rinkeby public testnet and Polygon mainnet.  
NFT's can then be minted by sending transaction to the deployed smart contract.

### Dependencies:

- `NodeJS`
  https://nodejs.org/en/download/
- `Ganache UI`  
  https://www.trufflesuite.com/ganache

(Ganache UI is not required in case you want to work with ganache-cli)

### Usage:

1. Clone the repo and run npm install.  
   `git clone https://github.com/amanganello/nft-befeda`

2. Install dependencies `npm install`

3. Put the image files that you want to convert into an NFT under assets folder.

5. Create a account in Pinata (https://www.pinata.cloud/) and create an API Key.  
   Click on top right profile picture -> API Keys -> New Key  
   Note down The API Key and API Key Secret and update in .env file.

5. Update the name of your image file in `assets` folder.  
   Update `filePath` with your image filepath.
   Run `node scripts/runScript` command.
   This will call Pinata API's and will upload file to IPFS and a new file will be created in `data` folder `ipfsHash.json` and the
   Pinata response containing the `ipfsHash` will be populated in that file.

6. Now create a metadata.json file with the details about your NFT. For Reference checkout data/metadata.json file .
   Update `filePath` with your metadata filepath.
   Again Run `node scripts/runScript` command.
   This will call Pinata API's and will upload metadata file to IPFS and the Pinata response containing the `ipfsHash` will be again populated in `ipfsHash.json` file.

7. Install latest solidity version by running `npm install solc` and Don't forget to update this solidity version in truffle-config.

8. Update Mumbai test network details in `truffle-config.js`.
   Update your account mnemonic in `.env` file.
   Now run `truffle console --network mumbai` to connect to Mumbai Public test network.  
   Run `migrate` command to deploy the contract on Mumbai testnet.  
   Run `let certificate = await ArtCertificate.deployed()`.  
   Run `await certificate.claimItem('https://ipfs.io/ipfs/IPFS_HASH_TO_METADATA')`  
   Pass the correct metadata file IPFS address to claimItem.  
   Run `certificate.address` to get contract address.

9. Checkout your NFT on
   `https://testnets.opensea.io/assets/contract_address/tokenId`.  
    You can also verify your metadata using on https://rinkeby-api.opensea.io/asset/contract_address/tokenId/validate  
    eg: https://rinkeby-api.opensea.io/asset/0x1e9930Bc5f39dE0515BeC52612bc4510F7B236C0/1/validate

10. To deploy your NFT on polygon mainnet
   Update MNEMONIC of your MATIC funded Metamask account in .env file.   
   Run `npx truffle migrate --network matic`
   This will deploy your contract to polygon mainnet.    
   Copy the deployed contract address and update it in .env file.  
   Pass your metadata file tokenURI in cliamItem in mintNft.js.   
   run `node scripts/mintNft.js`

10. Checkout your NFT on
    `https://opensea.io/assets/matic/contract_address/tokenId`
