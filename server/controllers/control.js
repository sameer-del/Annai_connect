const db = require("../modules/dataBase");
const fs = require("fs").promises;
const path = require("path");

const getData = async (req, res) => {
  try {
    const query = "SELECT * FROM bcaStudents";

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
    const query = "SELECT * FROM bcaStudents WHERE roll_no=?";
    db.query(query, [rollNo], (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Student not found", error: "Student not found" });
      }
      console.log(results);
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

const checkData = async (req, res) => {
  const { rollno } = req.body;
  console.log(rollno);
  try {
    const query = "select * from bcaStudents where roll_no=?";
    db.query(query, [rollno], (err, results) => {
      if (results === 0) {
        res.status(400).json({
          message: "Invalid",
        });
      }

      res.status(200).json({
        message: "OK",
        student: results[0],
      });
    });
  } catch (err) {
    console.log("Received Roll", err);
  }
};

const addStudent = (req, res) => {
  const { roll_no, name, email, phone, department, year, insta, bio } =
    req.body;
  console.log(req.body);
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const query = `
    INSERT INTO bcaStudents (roll_no, name, email, phone, department, year, insta, image_url, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [roll_no, name, email, phone, department, year, insta, image_url, bio],
    (err, result) => {
      if (err) {
        console.log("Insert error:", err);
        return res.status(500).json({ error: "Failed to add student" });
      }
      res.status(201).json({
        message: "Student added successfully",
        id: result.insertId,
        image_url,
      });
    }
  );
};

const getStatus = (req, res) => {
  const query =
    "select COUNT(*) as total_students,MAX(created_at) as latest_student_added,COUNT(DISTINCT department) as total_departments FROM bcaStudents";
  db.query(query, (err, result) => {
    if (err) {
      console.log("query thappu dah");
      return res
        .send(500)
        .json({ error: "failed to fetch the data because of the query" });
    }
    res.json(result[0]);
  });
};

const updateStudent = (req, res) => {
  const { rollNo } = req.params;
  const { name, email, phone, department, bio } = req.body;
  
  try {
    // First check if student exists and get current image
    const getCurrentImage = "SELECT image_url FROM bcaStudents WHERE roll_no = ?";
    
    db.query(getCurrentImage, [rollNo], async (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      
      if (!results.length) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      // Start with the current image URL
      let imageUrl = results[0]?.image_url;
      
      // If there's a new image file uploaded
      if (req.file) {
        // Delete old image if it exists
        if (results[0]?.image_url) {
          const oldImagePath = path.join( '../client/public', results[0].image_url);
          try {
            await fs.unlink(oldImagePath);
            console.log("Old image deleted successfully");
          } catch (error) {
            console.log('Error deleting old image:', error);
            // Continue with the update even if old image deletion fails
          }
        }
        
        // Set new image URL
        imageUrl = `/uploads/${req.file.filename}`;
      }
      
      // Update student record with new data
      const updateQuery = `
        UPDATE bcaStudents 
        SET name = ?, email = ?, phone = ?, department = ?, bio = ?, image_url = ? 
        WHERE roll_no = ?
      `;
      
      db.query(
        updateQuery,
        [name, email, phone, department, bio, imageUrl, rollNo],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ error: "Failed to update student" });
          }
          
          res.json({
            message: "Student updated successfully",
            image_url: imageUrl
          });
        }
      );
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getStudent = (req, res) => {
  const { rollNo } = req.params;
  const query = "select * from bcaStudents WHERE roll_no=?";
  db.query(query, [rollNo], (err, result) => {
    if (err) {
      console.log("query thappu dah");
      return res
        .status(500)
        .json({ error: "failed to fetch the data because of the query" });
    }
    res.json(result[0]);
  });
};
const deleteStudent = (req,res)=>{
  const {rollNo}=req.params;
  const deleteStudent= "DELETE from bcaStudents where roll_no=?";
  db.query(deleteStudent,[rollNo],(err,result)=>{
    if(err)
{
  console.log("query thappu dah");
  return res.status(500).json({error:"failed to delete the data because of the query"})
}
res.json({message:"deleted successfully"});
  })
}
module.exports = {
  getData,
  loginUser,
  checkData,
  addStudent,
  getStatus,
  updateStudent,
  getStudent,
  deleteStudent
};
