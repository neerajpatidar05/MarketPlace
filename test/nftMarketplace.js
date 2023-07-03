
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("Check NFT", async function () {
    let user1,
          user2,
          user3,
          user4,
          user5,
          userAddress1,
          userAddress2,
          userAddress3,
          alkham;
  
      let addProduct;
  
      beforeEach(async function () {
          [user1, user2, user3, user4, user5] = await ethers.getSigners();
  
          userAddress1 = await user1.getAddress();
          userAddress2 = await user2.getAddress();
          userAddress3 = await user3.getAddress();
  
          const Aalkam = await ethers.getContractFactory("NFTMarketplace");
          alkham = await Aalkam.deploy();
  
          addProduct = async () => {
              console.log(await alkham.name(),"owneeeeeeeeeeeeeeeeeeeerrrr");
          };
      });
  it("should call the owner",async function(){

    addProduct();
    console.log("finallllll");
  })
   

  });