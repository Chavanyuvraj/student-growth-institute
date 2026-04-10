const express = require("express");
const router = express.Router();
const multer = require("multer");
const Material = require("../models/Material");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const safeFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeFilename);
  },
});

const upload = multer({ storage });


module.exports = router;
