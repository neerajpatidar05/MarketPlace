import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
	supportedChainIds: [
		1, 3, 4, 5, 42, 56, 97, 137, 80001, 10, 250, 42220, 43114, 42161, 31337,
	],
});


export const getLibrary = (provider) => {
	const library = new Web3Provider(provider);
	library.pollingInterval = 8000;
	return library;
};
