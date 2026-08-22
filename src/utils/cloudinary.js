import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETS,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File Upload on cloudnary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the localy save temporary file as the upload opration got failed
    return null;
  }
};

export { uploadOnCloudinary };
