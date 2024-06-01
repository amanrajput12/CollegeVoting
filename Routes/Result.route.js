import { Router } from "express"
import { resultAdd, resultGet } from "../Controllers/Result.controller.js"


const resultrouter =Router()


resultrouter.route("/add").post(resultAdd)
resultrouter.route("/get").post(resultGet)


export  {resultrouter}