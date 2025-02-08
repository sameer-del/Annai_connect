const db = require("../modules/dataBase");

const getData = async (req, res) => {
  
  try {
    const query = "SELECT * FROM students";

    db.query(query, (err, result) => {
      if (err) {
        console.log("query didnt work");
      }
      res.json(result);
    });
  } catch (err) {
    console.log("query didnt work");
  }
};

const loginUser = async (req, res) => {
  try {
    const { rollNo } = req.body;

    if (!rollNo) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    console.log("Received Roll No:", rollNo);
    const query = "SELECT * FROM students WHERE roll_no=?";
    db.query(query, [rollNo], (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Student not found", error: "Student not found" });
      }

      res.status(200).json({
        message: "login succesful",
        student: results[0],
      });
    });
  } catch (err) {
    console.log("Received Roll", err);
  }
  // Simulating a success response
};
module.exports = { getData, loginUser };
