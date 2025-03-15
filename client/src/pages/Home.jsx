import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-96 -right-24 animate-pulse delay-700"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex justify-center items-center flex-col min-h-screen px-4">
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <img
            src="/annai-logo.png"
            alt="Annai Logo"
            className="w-[200px] drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              BCA Department
            </span>
            <br />
            <span className="text-4xl md:text-6xl">Gallery</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to our digital memory vault! Share your moments, connect
            with classmates, and preserve our college memories forever in this
            exclusive BCA gallery.
          </p>
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            onClick={() => navigate("/login")}
            className="group relative px-8 py-3 w-64 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 text-lg font-semibold">
              Login Gallery
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/viewDetails")}
            className="group relative px-8 py-3 w-64 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            <span className="relative z-10 text-lg font-semibold">
              View Details
            </span>
          </button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto px-4"
        >
          {[
            {
              title: "Share Memories",
              description: "Upload and share your favorite college moments",
              icon: "📸",
            },
            {
              title: "Connect",
              description: "Stay connected with your BCA classmates",
              icon: "🤝",
            },
            {
              title: "Preserve",
              description: "Keep your memories safe in our digital gallery",
              icon: "💫",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
