import { createSlice } from "@reduxjs/toolkit";



const VotingPanelSlice = createSlice({
    name:"votingPanel",
    initialState:{
        StartTime:"",
        EndTime:"",
       partyName:"",
       candidateName:"",
       VotingId:"",
    },
    reducers:{
       
        addVoting:(state,action)=>{
            state.StartTime=action.payload.startTime,
            state.EndTime= action.payload.endTime,
            state.candidateName=action.payload.candidateName,
            state.partyName = action.payload.partyName,
            state.VotingId= action.payload.id
        },
        removeVoting:(state)=>{
            state.StartTime=""
            state.EndTime= "",
            state.candidateName="",
            state.partyName = "",
            state.VotingId= ""
        }
    }
})
 export const {addVoting,removeVoting}=  VotingPanelSlice.actions
  
export default VotingPanelSlice.reducer