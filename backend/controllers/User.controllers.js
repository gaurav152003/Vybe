import uploadoncloudinary from "../config/cloudinary.js";
import User from "../models/User.model.js"
import mongoose from "mongoose";

export const getCurrentUser = async (req, res) => {
 try {
     const userId = req.userId
     const user = await User.findById(userId).populate("posts loops posts.author posts.comment loops.author loops.comment")
     if (!user) {
         return res.status(400).json({message:"User not found"})
     }
     return res.status(200).json(user)
 } catch (error) {
    return res.status(500).json({message:`Get current user error! ${error}`})
 }   
}

export const suggestedusers = async (req, res) => {
  try {
    const loggedInUserId = new mongoose.Types.ObjectId(req.userId);

    const users = await User.aggregate([
      { $match: { _id: { $ne: loggedInUserId } } }, // exclude logged-in user properly
      { $sample: { size: 4 } }, // random 5 users
      { $project: { password: 0 } } // exclude password field
    ]);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get suggested user error ${error}` });
  }
};


export const editprofile = async (req, res) => {
  try {
    const { name, username, bio, profession } = req.body;

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    
    const existingUser = await User.findOne({ username }).select("-password");
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ message: "Username already exists" });
    }

  
    let profileImageUrl = user.profileImage; 

    if (req.file) {

      const uploaded = await uploadoncloudinary(req.file.path);
      profileImageUrl = uploaded; 
    }

 
    user.name = name;
    user.username = username;
    user.bio = bio;
    user.profession = profession;
    user.profileImage = profileImageUrl;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "edit profile error",
      error: error.message
    });
  }
};



export const getprofile = async (req, res) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username }).select("-password").populate('posts loops followers following')
    if (!user) {
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:`get profile error ${error}`})
  }
}

// ne is not equal

export const follow = async (req, res) => {
  try {

   const currentuserid = req.userId
    const targetuserid = req.params.targetuserId
    if (!targetuserid) {
      return res.status(400).json({message:"target user not found"})
    }

    if (currentuserid == targetuserid) {
      return res.status(400).json({message:"you cannot follow yourself"})
    }
    
    const currentuser = await User.findById(currentuserid)
    const targetuser = await User.findById(targetuserid)
    
    const isfollowing = currentuser.following.includes(targetuserid)
    if (isfollowing) {
      currentuser.following = currentuser.following.filter(id => id.toString() != targetuserid)
      targetuser.followers = targetuser.followers.filter(id => id.toString() != currentuserid)
      await currentuser.save()
      await targetuser.save()
      return res.status(200).json({
        following: false,
        message: "unfollow"
      })
    } else {
      currentuser.following.push(targetuserid)
      targetuser.followers.push(currentuserid)
      await currentuser.save()
      await targetuser.save()
      return res.status(200).json({
        following: true,
        message:"follow"
      })
    }

  } catch (error) {
    return res.status(500).json({message:"follow error"})
  }
}













 