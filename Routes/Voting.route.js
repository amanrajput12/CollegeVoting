import { Router } from "express";
import { VotingAdd, VotingLogin, getVoting } from "../Controllers/Voting.controller.js";


const votingroute = Router()


votingroute.route("/login").post(VotingLogin)
votingroute.route("/addvote").post(VotingAdd)
votingroute.route("/getvote").get(getVoting)

export {votingroute}