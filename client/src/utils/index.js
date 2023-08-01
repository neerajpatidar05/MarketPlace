import { getAddress } from "@ethersproject/address";
import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const isMetaMaskInstalled = () => {
	return typeof window.web3 !== "undefined";
};


export const toWei = (amount, decimals = 18) => {
	try {
		if (!amount) {
			return new BigNumber(0).toString();
		}
		return new BigNumber(amount)
			.multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
			.toFixed(0)
			.toString();
	} catch (error) {
		console.log("exeption in toWei , ", error);
		return null;
	}
};

export const fromWei = (amount, decimals = 18) => {
	console.log("amount", amount);
	try {
		if (!amount) {
			return new BigNumber(0).toString();
		}

		return new BigNumber(amount)
			.div(new BigNumber(10).exponentiatedBy(decimals))
			.toString();
	} catch (error) {
		console.log("exeption in fromWei ", error);
		return null;
	}
};


export const isNumber = (value) => {
	return !isNaN(parseInt(value));
};

export function isAddress(value) {
	try {
		return getAddress(value);
	} catch {
		return false;
	}
}

export const imageWithAndHeight = (providedFile) => {
	const imageDimentions = { width: null, height: null };
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(providedFile);
		reader.onload = function () {
			const img = new Image();
			img.src = reader.result;
			img.onload = function () {
				imageDimentions.width = img.width;
				imageDimentions.height = img.height;

				resolve(imageDimentions);
			};
		};
	});
};

