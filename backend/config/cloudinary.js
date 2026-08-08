// ============================================
// 📸 CLOUDINARY CONFIGURATION
// ============================================
// Purpose: Configure Cloudinary for image upload
// This file connects your app to Cloudinary cloud storage
// ============================================

const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

// ============================================
// 📤 UPLOAD IMAGE FUNCTION
// ============================================
// Purpose: Upload image from buffer to Cloudinary
// Parameter: fileBuffer - image data as buffer
// Parameter: folder - where to store in Cloudinary
// Returns: { public_id, url, width, height }
// ============================================

const uploadImage = async (fileBuffer, folder = "ethiopia_tourism") => {
  try {
    // Convert buffer to base64 string
    const base64String = fileBuffer.toString("base64");
    const dataURI = `data:image/jpeg;base64,${base64String}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      transformation: [
        { width: 200, height: 200, crop: "fill" }, // Resize to 200x200
        { quality: "auto" }, // Auto compress
      ],
    });

    // Return image details
    return {
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
};

// ============================================
// 🗑️ DELETE IMAGE FUNCTION
// ============================================
// Purpose: Delete image from Cloudinary
// Parameter: publicId - Cloudinary public ID
// ============================================

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary delete error:", error);
    throw error;
  }
};

// Export functions
module.exports = { cloudinary, uploadImage, deleteImage };
