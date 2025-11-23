import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
const uploadoncloudinary = async (file) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_APISECRET
        });
    
        const result = await cloudinary.uploader
            .upload(file, {
                resource_type: 'auto'
            })
            
        fs.unlinkSync(file)
        return result.secure_url
    }
    catch (error) {
         fs.unlinkSync(file)
        console.log(error)
    }
}
export default uploadoncloudinary