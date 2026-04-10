const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" Mongo Error:", err));

// ✅ CORS (ONLY ONCE)
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const materialRoutes = require("./routes/materialRoutes");
app.use("/api/materials", materialRoutes);
const admissionRoutes = require("./routes/admissionRoutes");
app.use("/api/admissions", admissionRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => console.log(" Server running on port 5000"));