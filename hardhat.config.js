require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle")
/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()

const ALCHEMY_API_KEY = "wTSdqLJOby9onkFiynp1zhnHLFaKqiFU" ;
const POLYGON_PRIVATE_KEY = "7b5b19179a156da1b3a9cac22e770c97733280ae3b980ad25208080345ff90ac";   

module.exports = {
  solidity: "0.8.9",
 
  networks:{
    polygon:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${POLYGON_PRIVATE_KEY}`]
    }
  }
};
