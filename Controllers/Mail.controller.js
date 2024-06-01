
import Token from "../Models/Token.Schema.js";
import { User } from "../Models/Login.Schema.js";

export const mailController = async(req,res)=>{
    try {
        const token = await Token.findOne({
            token:req.params.token
        })
        console.log("token are",token);
        if(token){
            await User.updateOne({_id:token.userId},{
                $set:{verfied:true}
            })
            await Token.findByIdAndDelete(token._id)
{/* <a href="http://localhost:5173/">click here</a> */}
            res.send(`Email verifed success, now login again to proceed or <a href="https://votingappqrscanner.netlify.app/">click here</a>`)
        }
    } catch (error) {
        console.log("error on email route",error.message);
    }
}