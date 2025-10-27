const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Allowed mime types
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "video/mp4": "mp4",
  "video/mov": "mov",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // your folder path
  },
  filename: function (req, file, cb) {
    const ext = FILE_TYPE_MAP[file.mimetype];
    if (!ext) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, `${uuidv4()}.${ext}`);
  },
});

// Maximum file size (optional)
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

// Single file uploader
const uploadSingle = (fieldName) =>
  multer({
    storage,
    limits: { fileSize: MAX_SIZE },
  }).single(fieldName);

// Multiple files uploader
const uploadMultiple = (fieldName, maxCount = 10) =>
  multer({
    storage,
    limits: { fileSize: MAX_SIZE },
  }).array(fieldName, maxCount);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
