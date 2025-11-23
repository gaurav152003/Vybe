import express from "express";
import isAuth from "../middlewares/IsAuth.js";

import { upload } from "../middlewares/multer.js";
import { comment, getallposts, like, postdelete, savedpost, uploadpost } from "../controllers/Post.controllers.js";


const postRouter = express.Router()
postRouter.post("/upload", isAuth, upload.single("media"),uploadpost)
postRouter.get('/getall', isAuth, getallposts)
postRouter.get('/like/:postId', isAuth,like)
postRouter.post('/comment/:postId', isAuth, comment);
postRouter.get("/saved/:postId", isAuth, savedpost);
postRouter.delete('/remove/:postId',isAuth,postdelete)

export default postRouter;