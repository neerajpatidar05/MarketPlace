require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle")
/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()

const ALCHEMY_API_KEY = "" ;
const POLYGON_PRIVATE_KEY = "";   

module.exports = {
  solidity: "0.8.4",
 
  networks:{
    polygon:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${POLYGON_PRIVATE_KEY}`]
    }
  }
};
