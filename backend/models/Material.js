
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  classRange: String,
  subject: String,
  fileUrl: String,
});

module.exports = mongoose.model("Material", materialSchema);