// web3Config.js
import Web3 from 'web3';
import abi from 'abi/ERC721Contract.json'
import { ethers } from 'ethers';
import React, { useState ,useEffect} from 'react';
import marketplaceabi from 'abi/marketplace.json'
// Initialize your web3 connection
const marketplaceaddress='0xf43E9272E7c505d658cAC2c07Ee551f3dDF18Ac0';
const address = '0x5C28F4E71005CedB42263C26A785B50DbAa51b73';
const contractabi = abi.abi;
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const nftcontract = new ethers.Contract(address, contractabi,signer);
const marketplacecontractabi = marketplaceabi.abi;
const marketplaceContract=new ethers.Contract(marketplaceaddress, marketplacecontractabi,signer);

export { nftcontract, marketplaceContract,marketplaceaddress };
