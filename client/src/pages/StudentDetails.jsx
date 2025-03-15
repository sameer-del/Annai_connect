import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StudentDetails = () => {
  const { rollNo } = useParams();
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <section className="h-screen bg-gradient-to-br from-blue-500/10 to-purple-600/10 py-20 px-4 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[95%]  mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="relative p-8">
          {/* Decorative blurs */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0"
            >
              <img
                src={student.image_url || "/default-avatar.png"}
                alt={student.name}
                className="w-64 h-80 object-cover rounded-xl border-4 border-white/20 shadow-xl"
              />
            </motion.div>

            {/* Student Information */}
            <div className="flex-1 space-y-6">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                {student.name}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Roll No:</span>
                  <span className="text-gray-700 font-medium">{student.roll_no}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-gray-700 font-medium">{student.phone}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-700 font-medium">{student.email}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Course:</span>
                  <span className="text-gray-700 font-medium">{student.department}</span>
                </div>
               
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Course:</span>
                  <span className="text-gray-700 font-medium">{student.bio}</span>
                </div>

                <div className="pt-6 flex gap-4">
                  <Link to={`tel:${student.phone}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/25"
                    >
                      Call
                    </motion.button>
                  </Link>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/25"
                  >
                    Go Back
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StudentDetails;
