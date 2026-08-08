const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected successfully!");
    console.log("📸 Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("✅ API Key:", process.env.CLOUDINARY_API_KEY);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
    console.log("Please check your .env credentials");
  }
}

testConnection();
