import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

export const uploadImage = async (file) => {
    const newFileName = `${new Date().getTime()}-${file.name}`.replaceAll(" ", "_")
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "image",
            filename_override: `${newFileName}`,
            use_filename: true,
            folder: `project_web72`,
            unique_filename: false
        }, (error) => reject(error)).end(file?.data, () => resolve(newFileName));
    })
}