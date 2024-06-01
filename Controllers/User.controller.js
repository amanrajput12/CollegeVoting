import mongoose from "mongoose";
import { User } from "../Models/Login.Schema.js";
import bcryptjs from "bcryptjs"
import Token from "../Models/Token.Schema.js";
import crypto from "crypto"
import verifymail from "../Mailsend.js";



export const registerUser = async function(req, res) {
    try {
        const { userName, email, password } = req.body;
        console.log("value", email, password, userName);

        // Check if user already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
                const bcryptpassword = await bcryptjs.hash(password,10)
        // Create new user if it doesn't exist
        const newUser = await User.create({
            email,
            password:bcryptpassword,
            userName
        });
        // create token
           const token = new  Token({userId:newUser._id,
            token: crypto.randomBytes(16).toString("hex")
        })
           await token.save()
           console.log(" get the token ",token);
         const link = `https://votingapplication-sqe5.onrender.com/v1/confirm/${token.token}`
      const data =`<div>
        <h2>Thank you for registering with us! To complete the registration process and activate your account, please verify your email address by clicking the link below:</h2>
        <h1>
      <a href=${link}>Click here to acitvate your account</a>
      </h1>
      <h4>Thank you for choosing Voting Application.</h4>
           <p>
           Best regards,
           Voting Portal
           </p>
      </div>
     `
       const mailsubject ="Verify Your Email Address to Activate Your Account"
       const mailtext = "welcome"
         await verifymail(email,data,mailsubject,mailtext)

        res.status(200).json({
            message: "User created successfully and  send verified link  to register email",
            data: newUser
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};



export const loginUser = async function(req,res){
    try {
        const {email,password}= req.body
        console.log("email",email,password);
        const user = await User.findOne({email})
        console.log("user ",user,user.password);

        if(!user){
            res.status(400).json({
                message:"user not exist exist"
            })
              }

              const passwordcorrect = await bcryptjs.compare(password,user.password)
            if(!passwordcorrect){
                res.status(400).json({
                    message:"password is not matched"
                })

            }
            res.status(200).json({
                message:"user login sucess",
                data:user
            })

    } catch (error) {
        console.log("error on login",error.message);
    }

}


export const logoutUser = async function(req,res){
     try {
        const {id }= req.body
        const data = await User.find()

        console.log('data',data);
        if(data){
            res.status(200).json({
                message:"user logout sucess",

            })
        }

     } catch (error) {
        console.log("error on login route",error);
     }

}
