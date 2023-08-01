/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, Grid, styled } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NFTCard from './NftCard'
import abi from 'abi/marketplace.json'
import { ethers } from 'ethers';
import Web3 from 'web3';
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
  const navigate = useNavigate();
  const [data,setData]=useState([])
  const [Page,setPage]=useState(4)



  const { testdata } = props
  // console.log(testdata.length)

  // useEffect(()=>{
  //   const  apiData = async() => {
  //     console.log("call")
  //    const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${Page}&size=10`);
  //     const jsonData = await response.json();
  //     console.log(jsonData) 
  //     setData(jsonData.data)
  //   };
  //   apiData()
  // },[])
  const [nfts, setNFTs] = useState([]);
  useEffect(()=>{
    const  apiData = async() => {
      const fetchNFTs = async () => {
        try {
          const address = '0x7D22c9017258983bbb7D32FcDEC15136feB6DB4F';
          const contractabi = abi.abi;
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contractss = new ethers.Contract(address, contractabi,signer);
          const tokenURIs = await contractss.getListedTokens();
          console.log(tokenURIs.length,"length");
          console.log(tokenURIs,"pure tokenuris");
        for(let i=0;i<tokenURIs.length;i++){
          if(tokenURIs[i].seller!=='0x0000000000000000000000000000000000000000')
          setNFTs(tokenURIs);
        }
          console.log(tokenURIs[0].seller,"tokenurisssss1111");
         
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
      {/* <button onClick={connectToMetamask}>Connect to Metamask</button> */}
       <div>
        {
//         nfts.map((tokenURI, index) => (
//           <Card key={index}>
//             {/* Display NFT image */}
//             <CardMedia component="img" src={tokenURI.image} alt={`NFT ${tokenURI}`} />
// {/* {console.log(tokenURI.image)} */}
//             <CardContent>
//               {/* Display NFT details */}
//               <Typography variant="h5" component="div">
//                 NFT Title
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//               NFT Description
//               </Typography>
//             </CardContent>
//           </Card>
//         ))
        }
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
  // const  fetchMoreData = async() => {
  //     setPage(Page +1)
  //     const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${Page}&size=10`);
  //     const jsonData = await response.json();
  //     setData(jsonData.data)
  //     setData(data.concat(jsonData.data))
   
  // };
  // return (
  //   <>
  //    <InfiniteScroll
  //         dataLength={data?.length}
  //         next={fetchMoreData}
  //         hasMore={true}
  //         loader={<h4>Loading...</h4>}
  //       >
  
  //   {console.log("data",data)}
  //     <CardBody>
  //       {data?.map((d) => {
  //         return (
  //           <>
            
  //             <Body >
  //             <Link to="/details" state={{ d: d }}>
  //              <NFTCard data={d}/>
  //               </Link>
  //             </Body>
          
            
  //           </>
  //         )
  //       })}
  //     </CardBody>

  //     </InfiniteScroll>
  //   </>
  // )
//}

export default NftLists

