import { createAsyncThunk } from "@reduxjs/toolkit";
import { web3NftContract } from "contract";


export const createNftAction =createAsyncThunk(
    "nft/createNft",
    async(data,{ getState, rejectWithValue, dispatch }) =>{
        console.log("data",data)
    try{
        const NftCreate = web3NftContract({
        });

        console.log('NftCreate', NftCreate)

    }catch(e){
        console.log("e----Action",e)
    }
    }
    );