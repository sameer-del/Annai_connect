import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "./UserContext";
import { motion } from "framer-motion";

const Login = () => {
  const [data, setData] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        rollNo: data,
      });
      setUser(response.data.student);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        navigate("/dashboard");
        toast.success("Login successful");
        setData("");
      }
    } catch (error) {
      toast.error("Invalid roll number");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse delay-1000"></div>
      </div>

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Enter your roll number to continue</p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Roll Number
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300
                           group-hover:border-gray-400/50"
                  placeholder="Enter your roll number"
                />
                <div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                       font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                       focus:ring-offset-gray-900 transition-all duration-300"
            >
              <span className="relative z-10">Login to Gallery</span>
            </motion.button>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mt-6"
            >
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                ← Back to Home
              </button>
            </motion.div>
          </motion.form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20"></div>
      </motion.div>
    </div>
  );
};

export default Login;
