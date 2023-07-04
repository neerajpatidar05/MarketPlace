const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NFTMarketplace", function () {
  let marketplace;
  let nftContract;
  let tokenId;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const ERC721 = await ethers.getContractFactory("ERC721Contract");
    nftContract = await ERC721.deploy();
    await nftContract.deployed();
    console.log("nft contract deployed to ",nftContract.address);
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    marketplace = await NFTMarketplace.deploy(nftContract.address);
    await marketplace.deployed();
    tokenId = 0;
    console.log("nft contract deployed to ",marketplace.address);

  
});

  it("should create a sale", async function () {
    const tokenURI = "https://example.com/token/1";
    
    await nftContract.connect(owner).safeMint(tokenURI);
    const price = ethers.utils.parseEther("1");
    const endAt = 120 // 1 hour from now
    const saleType = 1; // DirectSale

    await marketplace.createSale(tokenId, price, endAt, saleType);

    const sale = await marketplace.tokenIdToSale(tokenId);
    expect(sale.tokenId).to.equal(tokenId);
    expect(sale.seller).to.equal(await ethers.provider.getSigner().getAddress());
    expect(sale.floorPrice).to.equal(price);
    expect(sale.active).to.equal(true);
    expect(sale.SaleType).to.equal(saleType);
  });

  it("should cancel a sale", async function () {
    const tokenURI = "https://example.com/token/1";
    
    await nftContract.connect(owner).safeMint(tokenURI);
    const price = ethers.utils.parseEther("1");
    const endAt = 120 // 1 hour from now
    const saleType = 1; // DirectSale
console.log("parse ether  ====",price);
   await marketplace.createSale(tokenId, price, endAt, saleType);

    const sale = await marketplace.tokenIdToSale(tokenId);
    expect(sale.tokenId).to.equal(tokenId);
    expect(sale.seller).to.equal(await ethers.provider.getSigner().getAddress());
    expect(sale.floorPrice).to.equal(price);
    expect(sale.active).to.equal(true);
    expect(sale.SaleType).to.equal(saleType);
//   });
    await marketplace.cancelSale(tokenId);
    const sales = await marketplace.tokenIdToSale(tokenId);
    expect(sales.active).to.equal(false);
  });

  it("should buy a token", async function () {
    const tokenURI = "https://example.com/token/1";
    
    await nftContract.connect(owner).safeMint(tokenURI);
    const price = ethers.utils.parseEther("1");
    const endAt = 600; // 1 hour from now
    const saleType = 1; // DirectSale

    await marketplace.createSale(tokenId, price, endAt, saleType);

    const buyer = await ethers.provider.getSigner(1); // Use a different signer for the buyer
    const buyerAddress = await buyer.getAddress();
    const marketplaceBalanceBefore = await ethers.provider.getBalance(marketplace.address);

    await nftContract.connect(owner).approve(marketplace.address, tokenId);
    // Send the purchase transaction
    await marketplace.connect(buyer).buy(tokenId, { value: price });
    const sale = await marketplace.tokenIdToSale(tokenId);
    expect(sale.active).to.equal(false);

    const marketplaceBalanceAfter = await ethers.provider.getBalance(marketplace.address);

    const buyerBalanceAfter = await ethers.provider.getBalance(buyerAddress);

   // expect(marketplaceBalanceAfter).to.equal(marketplaceBalanceBefore.add(price));
    expect(buyerBalanceAfter).to.be.above(price);
  });

  it("should modify sale", async function(){
    const tokenURI = "https://example.com/token/1";
    await nftContract.connect(owner).safeMint(tokenURI);
    const price = ethers.utils.parseEther("1");
    const endAt = 600; // 1 hour from now
    const saleType = 1; // DirectSale

    await marketplace.createSale(tokenId, price, endAt, saleType);
  })
});


describe("ERC721Contract", function () {
  let contract;
  let nftMarketplaceContract;
  let owner;
  let addr1;
 let tokenId=0;
  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const ERC721Contract = await ethers.getContractFactory("ERC721Contract");
    contract = await ERC721Contract.deploy();
    await contract.deployed();

    const NFTMarketplaceContract = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplaceContract = await NFTMarketplaceContract.deploy(contract.address);
    await nftMarketplaceContract.deployed();
  });

  it("should mint an NFT", async function () {
    const tokenURI = "https://example.com/token/1";
    
    await contract.connect(owner).safeMint(tokenURI);
    const tokenOwner=await contract.owner();
    expect(tokenOwner).to.equal(owner.address);
     });

  it("should approve NFT to NFTMarketplace contract", async function () {
    const tokenURI = "https://example.com/token/1";
    
    await contract.connect(owner).safeMint(tokenURI);
    await contract.connect(owner).approve(nftMarketplaceContract.address, tokenId);
    const approvedAddress = await contract.getApproved(tokenId);
    expect(approvedAddress).to.equal(nftMarketplaceContract.address);
  });
});


describe("NFTMarketplace", function () {
  let marketplace;
  let nftContract;
  let tokenId;
  let owner;
  let bidder;

  beforeEach(async function () {
    [owner, bidder] = await ethers.getSigners();
    const ERC721 = await ethers.getContractFactory("ERC721Contract");
    nftContract = await ERC721.deploy();
    await nftContract.deployed();

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    marketplace = await NFTMarketplace.deploy(nftContract.address);
    await marketplace.deployed();

    tokenId = 0;
  });

  it("should start an auction", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftContract.connect(owner).safeMint(tokenURI);
    const floorPrice = ethers.utils.parseEther("1");
    const auctionDuration = 3600; // 1 hour from now

    await marketplace.createSale(tokenId, floorPrice, auctionDuration, 0);

    const sale = await marketplace.tokenIdToSale(tokenId);
    expect(sale.tokenId).to.equal(tokenId);
    expect(sale.seller).to.equal(await owner.getAddress());
    expect(sale.floorPrice).to.equal(floorPrice);
    expect(sale.active).to.equal(true);
    expect(sale.SaleType).to.equal(0);
    expect(sale.endAt).to.be.above(0);
  });

  it("should place a bid on an auction", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftContract.connect(owner).safeMint(tokenURI);
    const floorPrice = ethers.utils.parseEther("1");
    const auctionDuration = 3600; // 1 hour from now

    await marketplace.createSale(tokenId, floorPrice, auctionDuration, 0);

    const bidAmount = ethers.utils.parseEther("1.5");
    await expect(marketplace.connect(bidder).bid(tokenId, { value: bidAmount }))
      .to.emit(marketplace, "BidPlaced")
      .withArgs(tokenId, await bidder.getAddress(), bidAmount);

    const sale = await marketplace.tokenIdToSale(tokenId);
    expect(sale.floorPrice).to.equal(bidAmount);
    expect(sale.seller).to.equal(await bidder.getAddress());
  });

  it("should end an auction and transfer NFT to the highest bidder", async function () {
    const tokenURI = "https://example.com/token/1";
    await nftContract.connect(owner).safeMint(tokenURI);
    await nftContract.connect(owner).approve(marketplace.address, tokenId);
    const floorPrice = ethers.utils.parseEther("1");
    const auctionDuration = 3600; // 1 hour from now
    const bidderBalanceBefore = await ethers.provider.getBalance(await bidder.getAddress());

    await marketplace.createSale(tokenId, floorPrice, auctionDuration, 0);

    const bidAmount = ethers.utils.parseEther("1.5");
    await marketplace.connect(bidder).bid(tokenId, { value: bidAmount });

    // Advance the time to end the auction
    await ethers.provider.send("evm_increaseTime", [auctionDuration]);
    await ethers.provider.send("evm_mine");

    const ownerBalanceBefore = await ethers.provider.getBalance(await owner.getAddress());
console.log("owner balnce before",ownerBalanceBefore);
console.log("bidder balnce after",bidderBalanceBefore);

    await expect(marketplace.connect(owner).endAuction(tokenId))
    .to.emit(marketplace, "AuctionEnded")
    .withArgs(tokenId, await bidder.getAddress(), bidAmount);

  const sale = await marketplace.tokenIdToSale(tokenId);
  expect(sale.active).to.equal(false);

  const ownerBalanceAfter = await ethers.provider.getBalance(await owner.getAddress());
  const bidderBalanceAfter = await ethers.provider.getBalance(await bidder.getAddress());
  console.log("owner balnce after",ownerBalanceAfter);
  console.log("bidder balnce after",bidderBalanceAfter);
  
  // Check if the NFT was transferred to the highest bidder
  const newOwner = await nftContract.ownerOf(tokenId);
  expect(newOwner).to.equal(await bidder.getAddress());

});
});
