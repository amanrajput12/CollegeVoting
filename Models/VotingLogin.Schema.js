import mongoose from "mongoose";

const votingLoginSchema = new mongoose.Schema({
   votingId: {
      type: String,
      required: true,
     
   },
   adharId: {
      type: String,
      required: true
   }
});

const votingLogin = mongoose.model("votingLogin", votingLoginSchema);

export default votingLogin;
