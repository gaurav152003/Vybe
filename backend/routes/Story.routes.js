import express from "express";
import isAuth from "../middlewares/IsAuth.js";

import { upload } from "../middlewares/multer.js";
import { deletestory, getstorybyusername, uploadstory, Viewstory } from "../controllers/Story.controller.js";



const storyRouter = express.Router()
storyRouter.post("/upload", isAuth, upload.single("media"),uploadstory)
storyRouter.get('/getbyusername/:username', isAuth,getstorybyusername )
storyRouter.get('/view/:storyId', isAuth,Viewstory)


export default storyRouter;