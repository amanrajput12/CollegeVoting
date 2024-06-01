import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"


const username = process.env.EMAIL
const password = process.env.PASSWORD

console.log("hello",process.env.EMAIL);
console.log("username",username,password);


const verifymail = async(email,data,mailtext,mailsubject)=>{
    try {
      
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
