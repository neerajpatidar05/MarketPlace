import {React,useState} from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Select,
  styled,
  Typography,
} from '@mui/material'
import marketplaceabi from 'abi/marketplace.json'
import Grid from '@mui/material/Grid'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ArrowDropDown } from '@mui/icons-material';
import { ethers } from 'ethers'
import abi from 'abi/ERC721Contract.json'
import { nftcontract,marketplaceContract ,marketplaceaddress} from 'web3config/web3config'
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
function ListnftForSale() {
  const [amount, setAmount] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(1); // Default value is 1 Month
  const [saleType, setsaleType]=useState(1);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
  };
  const handlesaleType=(event)=>{
    setsaleType(event.target.value);
  }

let data ;
 async function handlelistfosale() {
        const param=[1,amount,1200,saleType];
        console.log(nftcontract,"nftcontrasssssssssss")
        const approve=await nftcontract.approve(marketplaceaddress,1);
        const listedTokens = await marketplaceContract.createSale(...param);
   
console.log(listedTokens,"listedtokensssss");
  }
  return (
    <>
    <div className="gamfi-breadcrumbs-section">
      <div className="container">
        <div className="apply-heading text-center">
          <h2 className="mb-0">Owned by : - </h2>
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
                  Owned by <b></b>
                </div>
                <div>
                  Current Price <b> ETH</b>
                </div>
              </Typography>
                  
            <Typography  style={{color:"black"}}>NFT Name : - <b></b></Typography>
                 
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
                      <span>198</span>/0
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button sx={{ background: '#121212' }} variant="contained" onClick={handlelistfosale}>
              List for sale
              </Button>
              {/* <Button sx={{ background: '#121212' }} variant="contained">
                Make offer
              </Button> */}
             amount <input type="number" value={amount} onChange={handleAmountChange} />
      <Select value={selectedTimePeriod} onChange={handleTimePeriodChange}>
        <option value={1}>1 Month</option>
        <option value={2}>1 Week</option>
      </Select>
      <Select value={saleType} onChange={handlesaleType}>
      <option value={1}>Auction</option>
      <option value={2}>DirectSell</option>
     </Select> </CardActions>
          </Card>
        </Grid>
      </Grid>
    </DatailsBody>
  </>
  )
}

export default ListnftForSale