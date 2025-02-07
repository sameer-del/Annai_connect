const cors = require("cors");
const express = require("express");
const { getData ,loginUser} = require("../controllers/control.js");
const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/users", getData);
router.post("/login",loginUser)
module.exports = router;
