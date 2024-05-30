
import { createSlice } from "@reduxjs/toolkit";

const resultslice = createSlice({
  name:"Result",
  initialState:{
        Data:[]
  },
  reducers:{
       addResult:(state,action)=>{
        state.Data= action.payload
       },
       removeResult:(state)=>{
        state.Data =""
       }
  }
})

export const {addResult,removeResult} = resultslice.actions

export default resultslice.reducer