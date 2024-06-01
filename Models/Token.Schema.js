import mongoose from "mongoose";
import votingLogin from "./VotingLogin.Schema.js";

const tokenSchema = new mongoose.Schema({
    userId:{
        type:String,
        ref:"User",
        require:true
    },
    token:{
        type:String,
        require:true
    }
})




const Token = mongoose.model("Token",tokenSchema)

export default Token
