const express = require("express");
const cors = require("cors");

require("dotenv").config(); // Load environment variables


const port = process.env.PORT || 8000; // Default to 5000 if PORT is not set

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS if needed


app.use("/", require("./routes/routes.js"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
