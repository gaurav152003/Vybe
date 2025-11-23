import express from "express";
import isAuth from "../middlewares/IsAuth.js";

import { upload } from "../middlewares/multer.js";
import { comment, getallloops, like, loopdelete, savedloop, uploadloop } from "../controllers/loop.controller.js";


const loopRouter = express.Router()
loopRouter.post("/upload", isAuth, upload.single("media"),uploadloop)
loopRouter.get('/getall', isAuth, getallloops)
loopRouter.get('/like/:loopId', isAuth, like)
loopRouter.post('/comment/:loopId', isAuth, comment)
loopRouter.delete('/remove/:loopId', isAuth, loopdelete)
loopRouter.get('/saved/:loopId',isAuth,savedloop)


export default loopRouter;