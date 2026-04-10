const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Material = require("../models/Material");

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

// ✅ Upload
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { classRange, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newMaterial = new Material({
      classRange: String(classRange),
      subject: subject.toLowerCase(),
      fileUrl: `/uploads/${req.file.filename}`,
    });

    await newMaterial.save();

    res.json({ message: "Upload successful" });

  } catch (err) {
    console.error("🔥 UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get materials
router.get("/:classRange/:subject", async (req, res) => {
  try {
    const { classRange, subject } = req.params;

    const materials = await Material.find({
      classRange: String(classRange),
      subject: subject.toLowerCase(),
    });

    res.json(materials);

  } catch (err) {
    console.error("🔥 FETCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;