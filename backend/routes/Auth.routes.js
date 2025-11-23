import express from "express"
import { resetpassword, sendotp, signIn, signOut, signUp, verifyotp } from "../controllers/Auth.controllers.js";

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin", signIn)
authRouter.post("/sendotp", sendotp)
authRouter.post("/verifyotp",verifyotp )
authRouter.post("/resetpassword",resetpassword )
authRouter.get('/signout', signOut)


export default authRouter; 