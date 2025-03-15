import React from "react";
import { useUser } from "../pages/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardView from "./DashboardView";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <p>user not found</p>;
  }

  return (
    <section className=" bg-gray-50 min-h-screen">
      <Navbar />
      <section className="mt-[80px] max-w-[98%] mx-auto px-4 py-3">
        <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          {/* Decorative blurs */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20"></div>
          
          {/* Profile Header */}
          <div className="relative z-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={user.image_url}
                alt="User Profile"
                className="w-[350px] h-[450px] rounded-xl border-4 border-white/20 shadow-xl"
              />
            </div>

            {/* Profile Info */}
            <motion.div 
              className="flex-1 mt-20 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="flex flex-col md:flex-row md:items-center gap-4 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1 
                  className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {user.name}
                </motion.h1>
                <div className="flex gap-2">
                  <motion.button 
                    className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div 
                className="text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.p 
                  className="text-gray-700 mb-2 text-lg"
                  whileHover={{ x: 10 }}
                >
                  <strong className="text-gray-400">Roll No:</strong> {user.roll_no}
                </motion.p>
                <motion.p 
                  className="text-gray-700 mb-2 text-lg"
                  whileHover={{ x: 10 }}
                >
                  <strong className="text-gray-400">Phone:</strong> {user.phone}
                </motion.p>
                <motion.p 
                  className="text-gray-700 mb-2 text-lg"
                  whileHover={{ x: 10 }}
                >
                  <strong className="text-gray-400">Email:</strong> {user.email}
                </motion.p>
                <motion.p 
                  className="text-gray-700 max-w-[55%] text-lg"
                  whileHover={{ x: 10 }}
                >
                  <strong className="text-gray-400">Bio:</strong> {user.bio}
                </motion.p>
                <Link to={`tel:${user.phone}`}>
                  <motion.button 
                    className="px-6 py-2 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Call
                  </motion.button>
                </Link>
                <Link to={user.insta} target="_blank">
                  <motion.button 
                    className="px-6 py-2 mt-4 ml-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Instagram
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-gray-200">
          <h1 className="text-[35px] font-semibold text-gray-900 text-center capitalize mt-3" >other friends</h1>
          </div>
        </div>
        <DashboardView />
      </section>
    </section>
  );
};

export default Dashboard;
