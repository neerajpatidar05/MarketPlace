/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, styled } from '@mui/material'
import { Link } from "react-router-dom";
import NFTCard from './NftCard'
import Web3 from 'web3';
import { marketplaceContract} from 'web3config/web3config'
const CardBody = styled(Box)(
  () => `
  
    margin: 30px 100px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap:2.5%;

}
  `,
)

const Body = styled(Card)(
  () => `
  width:20%;
  margin-bottom:2%;
  cursor:pointer;
  border: 1px solid;
  box-shadow: 5px 4px #342929;
  border-radius: 6%;


}
  `,
)

function NftLists(props) {
  const [nfts, setNFTs] = useState([]);
  useEffect(()=>{
    const  apiData = async() => {
      const fetchNFTs = async () => {
        try {
          const tokenURIs = await marketplaceContract.getListedTokens();
          console.log(tokenURIs.length,"length");
          console.log(tokenURIs,"pure tokenuris");
          const filteredTokenURIs = tokenURIs.filter(tokenURI => tokenURI.seller !== '0x0000000000000000000000000000000000000000');
          console.log(filteredTokenURIs,"filtertokenuris");
          setNFTs(filteredTokenURIs);
          } catch (error) {
          console.error('Error fetching NFTs:', error);
        }
      };

      if (typeof window.ethereum !== 'undefined') {
              try {
                await window.ethereum.enable();
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                const address = accounts[0];
                fetchNFTs(address);
              } catch (error) {
                console.error('Error connecting to Metamask:', error);
              }
            } else {
              console.error('Metamask is not installed');
            }         
    };
    apiData()
  },[])
  return (
    <div>
      <div>
       <CardBody> 
       {nfts?.map((d) => {
           return (
             <>
               <Body>
               <Link to="/details" state={{ d: d }}>
                <NFTCard data={d}/>
               </Link>
               </Body>
             </>
           )
         })}
       </CardBody>
      </div> 
    </div>
  );
};

export default NftLists

