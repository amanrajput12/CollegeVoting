
import {configureStore } from "@reduxjs/toolkit"
import VotingPanelSlice from "./VotingPanelSlice"
import UserSlice from "./UserSlice"
import ResultSlice from "./ResultSlice"

const Store =  configureStore({
    reducer:{
        vote:VotingPanelSlice,
        user:UserSlice,
        result:ResultSlice
    }
})


export default Store