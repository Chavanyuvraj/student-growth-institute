const express = require("express");
const router = express.Router();
const Admission = require("../models/Admission");

// 📥 Get all admissions
router.get("/", async (req, res) => {
  try {
    const data = await Admission.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Approve admission
router.put("/approve/:id", async (req, res) => {
  try {
    await Admission.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Reject admission
router.put("/reject/:id", async (req, res) => {
  try {
    await Admission.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ message: "Rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new admission
router.post("/", async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.json({ message: "Admission Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;