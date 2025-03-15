import React from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-60 group-hover:opacity-100 blur transition duration-300"></div>
                <a href="/" className="relative block">
                  <img
                    src="/annai-logo.png"
                    alt="Annai Logo"
                    className="w-[50px] h-[50px] object-contain rounded-full bg-white/20 p-1"
                  />
                </a>
              </div>
              <div>
                <motion.h1
                  className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-black"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  BCA Department
                </motion.h1>
              </div>
            </motion.div>

            {/* Navigation Links & Actions */}
            <div className="flex items-center space-x-6">
              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-6">
                {["Gallery", "About", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={handleClick}
                className="relative inline-flex items-center px-6 py-2 overflow-hidden rounded-xl 
                         bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg
                         hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="relative z-10 font-medium text-sm">
                  Logout
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Gradient Line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 background-animate"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      <style jsx>{`
        .background-animate {
          background-size: 200%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
