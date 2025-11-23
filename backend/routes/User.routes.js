import express from "express";
import isAuth from "../middlewares/IsAuth.js";
import { editprofile, follow, getCurrentUser, getprofile, suggestedusers } from "../controllers/User.controllers.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router()
userRouter.get("/current", isAuth, getCurrentUser)
userRouter.get('/suggesteduser', isAuth, suggestedusers)
userRouter.post('/editprofile', isAuth, upload.single("profileimage"), editprofile)
userRouter.get('/getprofile/:username', isAuth, getprofile)
userRouter.get('/follow/:targetuserId',isAuth,follow)

export default userRouter;