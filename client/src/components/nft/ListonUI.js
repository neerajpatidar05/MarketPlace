import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from 'abi/ERC721Contract.json'
import marketplaceabi from 'abi/marketplace.json'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ListonUI() {
  const [listedNFTs, setListedNFTs] = useState([]);

  useEffect(() => {
    fetchListedNFTs();
  }, []);

  const fetchListedNFTs = async () => {
    const address = '0x5C28F4E71005CedB42263C26A785B50DbAa51b73';
const nftcontractabi = abi.abi;

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const nftcontracts = new ethers.Contract(address, nftcontractabi,signer);
const marketplacecontractabi = marketplaceabi.abi;
const marketplaceaddress='0xf43E9272E7c505d658cAC2c07Ee551f3dDF18Ac0';
const marketplaceContract=new ethers.Contract(marketplaceaddress, marketplacecontractabi,signer);
    // Call the getlistedtoken() function of the marketplace contract to get the array of listed NFTs
const listedTokens = await marketplaceContract.getListedTokens();
console.log(listedTokens,"listed tokensssssssssss");
    // Iterate through the listedTokens array and fetch the token URIs
const listedNFTsWithURIs = await Promise.all(
      listedTokens.map(async (token) => {
        const tokenURI = await nftcontracts.tokenURI(token.tokenId);
        console.log(tokenURI,"kkkkkk");
        return { ...token, tokenURI };
      })
    );
// console.log(listedNFTsWithURIs[0].tokenURI,"listed NFT With URLs");
    setListedNFTs(listedNFTsWithURIs);
  };
return(

 <>
      {listedNFTs.map((nft)=>(
        <div className="min-w-245 max-w-215 xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-245 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md hover:shadow-lg duration-500">
        <div className="relative w-215 h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
      <LazyLoadImage
            style={{ width: '300px'}}
            className="flex object-fill justify-center w-full items-center minmd:min-w-190 hover:scale-110 transition-all duration-500"
            alt="no"
            placeholderSrc="img"
            src="https://gateway.pinata.cloud/ipfs/Qmb4aNkjZ9XAkWwFndpBYWfdmHr5vRHYkNahH5R3fdQR2a"
          />
          
        
      </div>
      <div className="mt-3 flex flex-col " style={{ color: 'black' }}>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          Name: {nft.tokenURI.nftname}
        </p>
        <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
            Price: {nft.tokenURI.price || 500}
            <span className="normal">ETH</span>
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-lg">
            NFT Name : <span className="normal"> {nft.tokenURI.nftname}</span>
          </p>
        </div>
      </div>
    </div>))}
  </>
)

}

export default ListonUI;
