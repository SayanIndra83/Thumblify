import { v2 as cloudinary } from 'cloudinary';

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    export const CloudinaryUpload = async (filePath : string) => {
        try {
            if(!filePath) throw new Error("File not provided")
            const uploadResult = await cloudinary.uploader.upload(filePath, {resource_type: 'image', folder: "Thumbnails"})
            return uploadResult
        } catch (error) {
            throw new Error("Failed to upload on cloudinary")
        }
    }

    const getPublicIdFromUrl = (url: string) => {
    const splitUrl = url.split("/");
    const filenameWithExt = splitUrl[splitUrl.length - 1];
    const folder = splitUrl[splitUrl.length - 2];
    const filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));
    
    return `${folder}/${filename}`;
    };

    export const cloudinaryDel = async(url : string) =>{

        try {
            if(!url) {
                throw new Error("Url not provided")
            }
            const public_id = getPublicIdFromUrl(url)
           await cloudinary.uploader.destroy(public_id)
        } catch (error) {
            throw new Error("Cloudinary deletion failed")
        }

    }