const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  class: String,
  course: String,
    status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admission", admissionSchema);