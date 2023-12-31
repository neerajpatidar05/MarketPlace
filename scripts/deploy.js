// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("ERC721Contract");
	const nft = await NFT.deploy();
	await nft.deployed();

  const MarketPlace = await hre.ethers.getContractFactory("NFTMarketplace");
	const marketplace = await MarketPlace.deploy(nft.address);
	await marketplace.deployed();
  
  console.log("nft",nft.address)
  console.log("marketplace",marketplace.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
