const multer = require("multer");
const path = require("path");

// ✅ Memory storage - stores file in buffer
const storage = multer.memoryStorage();

// ✅ File filter - only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed! (JPEG, PNG, GIF, WEBP)"));
  }
};

// ✅ Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// ✅ Single file upload - field name must be 'profile_image'
const uploadSingle = upload.single("profile_image");

module.exports = { upload, uploadSingle };
