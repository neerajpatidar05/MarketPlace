
import React, { useState ,useEffect} from 'react';
import Web3 from 'web3';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { nftcontract, marketplaceContract } from 'web3config/web3config';
import { Box, styled } from '@mui/material'

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
 
  box-shadow: 1px 1px #342929;
  border-radius: 0%;
}
  `,
)
async function checkIfNFTIsListed(tokenUri) {
    return false  
}

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
          // if (combinedTokenURIsSet.size === 0) {
          //   console.log("All tokenURIs are empty, skipping setNFTs()");
          // } else {
          //   const finalFilteredTokenURIs = Array.from(combinedTokenURIsSet);
          //   console.log(finalFilteredTokenURIs, "tokenuri from profile");
          //   setNFTs(finalFilteredTokenURIs);
          // }
          const tokenDataArray = await Promise.all(Array.from(combinedTokenURIsSet).map(async (tokenUri) => {
            const tokenId = await nftcontract.getTokenId(tokenUri);
            const isListed = await checkIfNFTIsListed(tokenUri); 
            return { uri: tokenUri, id: tokenId , listed: isListed};
          }));
          console.log(tokenDataArray,"tokendataarray");
           setNFTs(tokenDataArray);
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
    <div><CardBody> <Body>
        {nfts.map((tokenURI, index) => (
         
          <Card key={index}>
            <CardMedia component="img" src='https://gateway.pinata.cloud/ipfs/Qmb4aNkjZ9XAkWwFndpBYWfdmHr5vRHYkNahH5R3fdQR2a'alt= {`NFT ${tokenURI.id}`} />
            <CardContent>
              <Typography variant="h5" component="div">
                Token Id - {tokenURI.id.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              NFT Description
              </Typography>
            
              {tokenURI.listed ? (
        <p>Listed</p>
      ) : (
        <Link to={"/listnftforsale"} state={{names:tokenURI}}>
          <button>List NFT</button>
        </Link>)}
             
          </CardContent>
          </Card>
        ))}</Body></CardBody>
      </div> 
  );
};

export default Profile;
