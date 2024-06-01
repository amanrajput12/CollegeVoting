import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
    candidateName:{
        type:String,
        required:true,
    
    },
    partyName:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
   

})

const Result = mongoose.model("Result",resultSchema)

export default Result











