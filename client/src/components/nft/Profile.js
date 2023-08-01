// // import React from 'react'
import abi from 'abi/ERC721Contract.json'
import { ethers } from 'ethers';
import React, { useState ,useEffect} from 'react';
import Web3 from 'web3';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const Profile = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(()=>{
    const  apiData = async() => {
      const fetchNFTs = async (Metamaskaddress) => {
        try {
          const address = '0xe67956aD93e177A91F210B295B79AD48A13C925d';
          const contractabi = abi.abi;
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contractss = new ethers.Contract(address, contractabi,signer);
          console.log(contractss,"contract object");
          const tokenURIs = await contractss.getOwnedNFTs(Metamaskaddress );
          console.log(tokenURIs,"tokenurissssssssssssssssssssssss");
          if (tokenURIs !== null) {
            // Filter out empty strings from tokenURIs array
            const filteredTokenURIs = tokenURIs.filter(uri => uri !== '');
          
            if (filteredTokenURIs.length === 0) {
              console.log("All tokenURIs are empty strings, skipping setNFTs()");
            } else {
              console.log(filteredTokenURIs, "tokenuri from profile");
              setNFTs(filteredTokenURIs);
            }
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
