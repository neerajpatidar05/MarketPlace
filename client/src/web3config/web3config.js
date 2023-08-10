// web3Config.js
import abi from 'abi/ERC721Contract.json'
import { ethers } from 'ethers';
import React, { useState ,useEffect} from 'react';
import marketplaceabi from 'abi/marketplace.json'
// Initialize your web3 connection
const marketplaceaddress='0xBA01432F68fcA69a27159178760A96b447F8Ec1F';
const nftcontractaddress = '0x58D1013a33e27D71B9Edb6C832eC839A0d44d395';
const contractabi = abi.abi;
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nftcontract = new ethers.Contract(nftcontractaddress, contractabi,signer);
const marketplacecontractabi = marketplaceabi.abi;
const marketplaceContract=new ethers.Contract(marketplaceaddress, marketplacecontractabi,signer);

export { nftcontract, marketplaceContract,marketplaceaddress ,nftcontractaddress};
