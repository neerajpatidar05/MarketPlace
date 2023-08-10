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
  TextField,
  Typography,
} from '@mui/material'
import { useRadioGroup } from '@mui/material/RadioGroup';

import { ethers } from 'ethers'
import Grid from '@mui/material/Grid'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { nftcontract,marketplaceContract ,marketplaceaddress,nftcontractaddress} from 'web3config/web3config'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  const location = useLocation();
  console.log(location,"locatiobnnnn");
  const tokenid = parseInt(location.state.names.id._hex);
  console.log(tokenid,"iddddddddddd");
  const [amount, setAmount] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(1); // Default value is 1 Month
  const [saleType, setsaleType]=useState(1);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
  };
  const handleSaleTypeChange=(event)=>{
    setsaleType(event.target.value);
  }
  function etherToWei(etherAmount) {
    const weiAmount = ethers.utils.parseEther(etherAmount.toString());
    return weiAmount;
  }
  
 async function handlelistfosale() {
        const weiAmount = etherToWei(amount);
        const param=[tokenid,weiAmount,selectedTimePeriod,saleType];
        console.log(nftcontract,"nftcontrasssssssssss")
        const approve=await nftcontract.approve(marketplaceaddress,0);
        const createSale = await marketplaceContract.createSale(...param);
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
    {console.log(saleType,"saletypeeee")}
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
                  Created by - You <b></b>
                </div>
                <div>
                  Current Price -<b> {amount} ETH</b>
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
                      <span>{nftcontractaddress}</span>
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
                      <span>{tokenid}</span>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button sx={{ background: '#121212' }} variant="contained" onClick={handlelistfosale}>
              List for sale
              </Button>            
             amount <input type="number" value={amount} onChange={handleAmountChange} />
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
          <NativeSelect
            value={selectedTimePeriod}
            onChange={handleTimePeriodChange}
            inputProps={{
            name: 'sale-type',
            id: 'sale-type-select',
          }}
        >
          <option value={43200}>12 Hours</option>
          <option value={86400}>1 Day</option>
          <option value={604800}>1 week</option>
          <option value={2592000}>30 Days</option>

        </NativeSelect> 
        <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
    onChange={handleSaleTypeChange}
  >
    <FormControlLabel value={1} control={<Radio />} label="DirectSale" />
    <FormControlLabel value={2} control={<Radio />} label="Auction" />
  </RadioGroup>
      </FormControl>
      </Box>
      </CardActions>
          </Card>
        </Grid>
      </Grid>
    </DatailsBody>
  </>
  )
}

export default ListnftForSale