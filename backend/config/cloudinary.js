const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Upload image from buffer
const uploadImage = async (fileBuffer, folder = "ethiopia_tourism") => {
  try {
    console.log("📸 Starting Cloudinary upload...");

    // Convert buffer to base64
    const base64String = fileBuffer.toString("base64");
    const dataURI = `data:image/jpeg;base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      transformation: [
        { width: 200, height: 200, crop: "fill" },
        { quality: "auto" },
      ],
    });

    console.log("✅ Cloudinary upload successful!");
    console.log("📸 URL:", result.secure_url);

    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error.message);
    throw error;
  }
};

module.exports = { cloudinary, uploadImage };
