import nodemailer from "nodemailer"
// import { username,password } from "./Mydata.js";

const  password=''
const username = ''

import dotenv from "dotenv"
dotenv.config()



const verifymail = async(email,data,mailtext,mailsubject)=>{
    try {
       console.log(username,password);
        const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports

    auth: {
      user:username,
      pass:password,
    },

  })

  let info =  await transporter.sendMail({
    from: username, // sender address
      to: email, // list of receivers
      subject:mailsubject,
      text:mailtext,
      html:data

  })
  console.log(" mail send sucess",info)
    } catch (error) {
        console.log("error on sending mail",error.message);
    }
}


export default verifymail
