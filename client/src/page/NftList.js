import { Box } from '@mui/material'
import NftLists from 'components/nft/NftLists'
import React, { useState } from 'react'

function NftList() {
  const [Data,setData]=useState()
  const data = [
    {
    name:"patric",
    itemname:"carton",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/e8b2304fef184cec9f95b40e46c6f001.png",
    price:"300"
  },
  {
    name:"John",
    itemname:"gyan",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/e17ac93bcb3640c0ac595eb4fcdf55c5.jpg",
    price:"500"
  },
  {
    name:"elyana",
    itemname:"human",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/e016e4fc423c4240a42acfbc7bb3763c.gif",
    price:"300"
  },
  {
    name:"sorty",
    itemname:"nature",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/f2cfd82f362443d7bb8214be831efa8c.png",
    price:"300"
  },
  {
    name:"Bloby",
    itemname:"carton",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/da951b8e2d3546f3a0f31baf5def5f2c.jpg",
    price:"300"
  },
  {
    name:"Juluy",
    itemname:"cartonFlask",
    img:"https://d2mzn4jmmon2v7.cloudfront.net/static/nfts/artworks/cee5dd9df77e4ff9b2623eb5f6812c24.png",
    price:"300"
  }
]

const TestData=[...data,...data,...data,...data,...data,...data,...data,...data,...data]

  return (
    <div>
      <div className="gamfi-breadcrumbs-section">
          <div className="container">
            <div className="apply-heading text-center">
              <h2 className="mb-0">NFT Collections</h2>
            </div>
          </div>
        </div>
      {/* <div style={{display:"flex",alinItem:"center",justifyContent: "center",margin: "2% 0%"}}>
        <h1>NFT Lists</h1>
      </div> */}
      <Box sx={{mt:10}}></Box>
        <NftLists testdata={TestData}/>
    </div>
  )
}

export default NftList