import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { rollNo } = useParams(); // Ensure it matches the route param name
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          rollNo: rollNo,
        });

        if (response.data.student) {
          setStudent(response.data.student);
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };
    fetchData();
  }, [rollNo]);

  if (!student) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">{student.name}</h1>
      <p className="text-gray-600">Phone: {student.phone}</p>
      <p className="text-gray-600">Email: {student.email}</p>
      <p className="text-gray-600">Course: {student.course}</p>
    </section>
  );
};

export default StudentDetails;
