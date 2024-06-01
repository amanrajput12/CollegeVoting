import mongoose from "mongoose";

const VotingDetailSchema = new mongoose.Schema({
    title:{
     type:String,
     require:true
    },
    candidateName:[{
        type:String, 
        require:true
    }],
    partyName:[{
        type:String,
        require:true
    }],
    startTime:{
        type:String,
        require:true
    },
    endTime:{
        type:String,
        require:true
    }

})

const VotingDetail = mongoose.model("VotingDetail",VotingDetailSchema)

export default VotingDetail