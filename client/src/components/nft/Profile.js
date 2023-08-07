
import React, { useState ,useEffect} from 'react';
import Web3 from 'web3';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { nftcontract, marketplaceContract } from 'web3config/web3config';
const Profile = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(()=>{
    const  apiData = async() => {
 
      const fetchNFTs = async (Metamaskaddress) => {
        try {
          const tokenURIs = await nftcontract.getOwnedNFTs(Metamaskaddress);
      
          const filteredTokenURIs = tokenURIs.filter(tokenUri => tokenUri && tokenUri.trim() !== '');
      
          const getSuccessfullyBoughtTokens = await marketplaceContract.getSuccessfullyBoughtTokens(Metamaskaddress);
          const tokenUriOfBoughtToken = [];
      
          if (getSuccessfullyBoughtTokens.length !== 0) {
            for (let i = 0; i < getSuccessfullyBoughtTokens.length; i++) {
              const tokenUri = await nftcontract.tokenURI(getSuccessfullyBoughtTokens[i]);
              if (tokenUri && tokenUri.trim() !== '') {
                tokenUriOfBoughtToken.push(tokenUri);
              }
            }
          }
      
          const combinedTokenURIsSet = new Set([...filteredTokenURIs, ...tokenUriOfBoughtToken]);
          if (combinedTokenURIsSet.size === 0) {
            console.log("All tokenURIs are empty, skipping setNFTs()");
          } else {
            const finalFilteredTokenURIs = Array.from(combinedTokenURIsSet);
            console.log(finalFilteredTokenURIs, "tokenuri from profile");
            setNFTs(finalFilteredTokenURIs);
          }
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
                console.log(address,"metamask address");
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
      {/* <button onClick={connectToMetamask}>Connect to Metamask</button> */}
      
        {nfts.map((tokenURI, index) => (
          <Card key={index}>
            {/* Display NFT image */}
            <CardMedia component="img" src={tokenURI.image} alt={`NFT ${tokenURI}`} />
{/* {console.log(tokenURI.image)} */}
            <CardContent>
              {/* Display NFT details */}
              <Typography variant="h5" component="div">
                NFT Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
              NFT Description
              </Typography>
              <Link to='/listnftforsale'>
              <button >List NFT</button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div> 
  );
};

export default Profile;
