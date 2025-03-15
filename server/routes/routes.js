const cors = require("cors");
const express = require("express");
const {
  getData,
  loginUser,
  checkData,
  addStudent,
  getStatus,
  updateStudent,
  getStudent,
  deleteStudent
} = require("../controllers/control.js");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get("/users", getData);
router.post("/login", loginUser);
router.post("/mydetails", checkData);
router.post("/admin/add-student", upload.single("image"), addStudent);
router.get("/admin/stats",getStatus);
router.put("/users/:rollNo",upload.single("image"),updateStudent);
router.delete("/users/:rollNo",deleteStudent);
router.get("/users/:rollNo",getStudent);

module.exports = router;
