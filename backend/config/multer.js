// ============================================
// 📁 MULTER CONFIGURATION
// ============================================
// Purpose: Handle file uploads from frontend
// Multer processes incoming files before they reach the controller
// ============================================

const multer = require("multer");
const path = require("path");

// ============================================
// 💾 STORAGE CONFIGURATION
// ============================================
// MemoryStorage stores file in memory (buffer)
// This is better for Cloudinary because we don't need disk storage
// ============================================

const storage = multer.memoryStorage();

// ============================================
// ✅ FILE FILTER - Only allow images
// ============================================

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;

  // Check file extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  // Check file MIME type
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    // ✅ Valid image - accept
    return cb(null, true);
  } else {
    // ❌ Invalid file type - reject
    cb(new Error("Only image files are allowed! (JPEG, PNG, GIF, WEBP)"));
  }
};

// ============================================
// ⚙️ CREATE MULTER INSTANCE
// ============================================

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB maximum file size
  },
  fileFilter: fileFilter,
});

// ============================================
// 📤 EXPORT MIDDLEWARES
// ============================================

// For single file upload with field name 'profile_image'
const uploadSingle = upload.single("profile_image");

// For multiple files with field name 'images'
const uploadMultiple = upload.array("images", 10);

module.exports = { upload, uploadSingle, uploadMultiple };
