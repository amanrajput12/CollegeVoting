
import { Router } from "express";


import { loginUser, logoutUser, registerUser } from "../Controllers/User.controller.js";
import { mailController } from "../Controllers/Mail.controller.js";


const router = Router()
router.route('/').get((req,res)=>res.send(
    "<h3>in router</h3>"
))  

router.route("/register").post(registerUser)
router.route("/confirm/:token").get(mailController)

router.route("/user/login").post(loginUser)
router.route("/logout").post(logoutUser)

export {router}