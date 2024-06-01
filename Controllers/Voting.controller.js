import VotingDetail from "../Models/VotingDetail.Schema.js";
import votingLogin from "../Models/VotingLogin.Schema.js"




export const VotingLogin = async(req,res)=>{
   try {
    const {adhar,validUser,VotingId} = req.body
    
    console.log(" data in body",req.body,adhar.length);
    if(validUser =="not allowed"){
        
      return res.status(400).json({
        message:"please login with valid id only"
      })
}

const existingVote = await votingLogin.findOne({ adharId: adhar, votingId: VotingId });
if(existingVote){
  return res.status(404).json({
    message:" user already vote",
    data:existingVote
  })
}

const login = await votingLogin.create({
    adharId:adhar,
    votingId:VotingId
   })
    res.status(200).json({
        message:"user login in voting sucess",
        sucess:true,
        data:login
    })
   } catch (error) {
    console.log("error to login the user in voting",error.message);
   }




}


export const VotingAdd = async(req,res)=>{
  try {
    const {votingdetail,timer}= req.body
    console.log(" val are",votingdetail);
     const setup = await VotingDetail.create({
      candidateName:votingdetail?.candidatename,
      partyName:votingdetail.partyname,
      startTime:timer.start,
      endTime:timer.end,
      title:votingdetail?.title
     })
     res.status(200).json({
      message:"voting setup  sucess",
      data:setup
     })
  } catch (error) {
    console.log("error on adding voting",error.message);
  }
}

export const getVoting = async(req,res)=>{
  try {
     const data = await VotingDetail.find()
     console.log("data",data);
     res.status(200).json({
      message:"all data sucessfully get",
      data:data
     })
  } catch (error) {
    console.log("error on get voting",error.message);
  }
} 