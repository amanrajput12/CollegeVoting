import express from "express"
import dotenv from "dotenv"
import {router} from "./Routes/User.route.js"
import connectDb from "./Db/Database.js"
import cookieParser from "cookie-parser";
import { votingroute } from "./Routes/Voting.route.js";
import {resultrouter} from "./Routes/Result.route.js";
const app = express()
dotenv.config()
connectDb()
app.use(express.json())
app.use(cookieParser())
app.use('/v1',router)
app.use("/v1/voting",votingroute)
app.use("/v1/result",resultrouter)
app.get("/",(req,res)=>{
    res.send("<h1>Helllo app</h1>")
})

app.listen(4000,(req,res)=>{
    console.log("app is listen at port")
})