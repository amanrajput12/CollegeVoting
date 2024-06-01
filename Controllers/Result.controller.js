
import Result from "../Models/Result.Schema.js";
import verifymail from "../mailsend.js";


export const resultAdd = async(req,res)=>{
    try {
        const {partyName,candidateName,id,email} = req.body
          console.log("on the result add",partyName,candidateName,id,email);
        const data = await  Result.create({
            partyName,
            candidateName,
            id
        })
        res.status(201).json({
            message:"result set sucess",
            result:data
        })
        
        const value =`<div>
        <h2>
        We are delighted to inform you that your vote has been successfully registered. Your participation in election  is greatly appreciated and plays a vital ...👍</h2>

         <h4>Thank you once again for your participation.</h4>
           <p>
           Best regards,
           Voting Portal
           </p>
      </div>
     `
       const mailsubject ="Voting sucess"    
       const mailtext = "Thanks for voting"
         await verifymail(email,value,mailsubject,mailtext)

    } catch (error) {
        console.log("error on result",error.message);
        res.status(404).json({
            message:"error to result"
        })
    }
}


export const resultGet = async(req,res)=>{
    try {
         const {partyName,id}= req.body
         console.log("in get ",partyName,id,typeof(id));
         const val = await Result.find({ $and: [{ id }, { partyName }] });


         console.log("for check both id and party",val[0]);
          const data =  await Result.find({ $and: [{ id }, { partyName }] }).count()
          res.status(200).json({
            result:data,
            forcheck:val
          })
    } catch (error) {
        console.log("error on get result",error.message);
        res.status(404).json({
            message:"error on get the result"
        })
    }
}