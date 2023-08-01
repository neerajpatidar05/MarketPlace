/* eslint-disable no-unused-vars */
import { Contract } from "@ethersproject/contracts";
import { isMetaMaskInstalled } from "utils";
import NFT from "abi/NftMarketPlace.json"
import Web3 from "web3";
import { RPC_URLS } from "constant";





const getContract =(abi,contractAddress)=>{
    if (isMetaMaskInstalled()) {
		return new Contract(contractAddress, abi);
	}
	return;
}

export const getWeb3Contract = (chainId, abi, contractAddress) => {
	let web3;
	if (isMetaMaskInstalled()) {
		web3 = new Web3(window.ethereum);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider(RPC_URLS?.[chainId]));
	}

	return new web3.eth.Contract(abi, contractAddress);
};



export const web3NftContract = ({ address, chainId }) => {
	if (!address) {
		return null;
	}

	return getWeb3Contract(chainId, NFT, address);
};