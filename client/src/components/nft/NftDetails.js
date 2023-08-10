import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  styled,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import abi from 'abi/marketplace.json'
import { ethers } from 'ethers';
import { marketplaceContract} from 'web3config/web3config';
const DatailsBody = styled(Box)(
  () => `
  
    margin: 3% 10%;
}
  `,
)
const ImagBody = styled(Box)(
  () => `
  
    display: flex;
    justify-content: flex-start;
}
  `,
)

const BackBtn = styled(Box)(
  () => `
   margin: 3% 10%;
    display: flex;
    justify-content: flex-start;
    cursor:pointer
   
}
  `,
)

function NftDetails() {
  const location = useLocation()
  const data = location.state.d
  const tokenId= parseInt(data.tokenId._hex)
  
async function handleBuy() {
  try {
    console.log(tokenId,"tokenid");
    await marketplaceContract.buy(tokenId,{value:1});
    
  } catch (error) {
    console.error('Error buying NFTs:', error);
  }
   return (
     <div>{console.log("buy button call")}</div>
   )
 }
 
 return (
    <>
      <div className="gamfi-breadcrumbs-section">
        <div className="container">
          <div className="apply-heading text-center">
            <h2 className="mb-0">Owned by : -  {data.name}</h2>
          </div>
        </div>
      </div>
      
      <Link to="/">
      <BackBtn><ArrowBackIcon/>  Back</BackBtn>
      </Link>

      <DatailsBody>
        <Grid container spacing={2}>
          <Grid item xs={2} md={6}>
            <div>
              
              <ImagBody>
                <img
                  src={`https://ipfs.io/ipfs/Qmb4aNkjZ9XAkWwFndpBYWfdmHr5vRHYkNahH5R3fdQR2a`}
                  width="70%"
                />
              </ImagBody>
            </div>
          </Grid>
          <Grid item xs={10} md={6}>
            <Card sx={{ width: '100%' }}>
              <CardContent>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    Owned by <b>{data.name}</b>
                  </div>
                  <div>
                    Current Price <b>{data.price} ETH</b>
                  </div>
                </Typography>
                    
              <Typography  style={{color:"black"}}>NFT Name : - <b>{data.itemname}</b></Typography>
                   
                <Typography>
                  <div>
                    <Grid item xs={4} sx={{ mt: 5 }}>
                    <Typography variant="h5" component="h5" style={{color:"black"}}>Description : -</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <p>
                        Column widths are integer values between 1 and 12; they
                        apply at any breakpoint and indicate how many columns
                        are occupied by the component. A value given to a
                        breakpoint applies to all the other breakpoints wider
                        than it (unless overridden, as you can read later in
                        this page). For example, xs={12} sizes a component to
                        occupy the whole viewport width regardless of its size.
                      </p>
                    </Grid>
                  </div>
                </Typography>
              
                <Box>
                <Typography variant="h5" component="h5" style={{color:"black",marginBottom:10}}>Details : -</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Contract Address:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>0xb6a37b5d14d502c3ab0ae6f3a0e058bc9517786e</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token Standard:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>ERC721</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Chain:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>Etherium</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token ID:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>198</span>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button sx={{ background: '#121212' }} variant="contained" onClick={handleBuy}>
                  Buy
                </Button>
                <Button sx={{ background: '#121212' }} variant="contained">
                  Place Bid 
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DatailsBody>
    </>
  )
}

export default NftDetails
