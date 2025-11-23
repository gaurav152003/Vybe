import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },

    password: {
        type: String,
        required:true
    },
    profileImage: {
        type: String,
    },
    bio: {
        type:String,
    },
    profession: {
      type:String,  
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
       }
    ],
    savedpost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    savedloop: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Loop"
        }
    ],
    loops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Loop"
        }
    ],
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Story"
    },

    resetotp: {
        type:String
    },
    otpexpire: {
       type:Date 
    },
    isotpverified: {
        type: Boolean,
        default:false
    }
}, { timestamps: true })


const User=mongoose.model("User",userSchema)

export default User;