const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
//import cors from "cors";
const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" Mongo Error:", err));



app.use(cors({
  origin: "https://student-growth-institute.onrender.com",
  credentials: true
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));