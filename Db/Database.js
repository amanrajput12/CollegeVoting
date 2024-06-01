import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log(" database coneection sucess",process.env.MONGODB_URI)

    } catch (error) {
        console.log("database connection error",error.message);
    }
}


export default connectDb