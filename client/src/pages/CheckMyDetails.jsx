import React, { useState } from "react";
import axios from "axios";

const CheckMyDetails = () => {
  const [rollno, setRollno] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const checkData = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/mydetails", {
        rollno: rollno,
      });

      if (response.data.student) {
        setData(response.data.student);
      } else {
        setData(null);
        setError("No details found for this roll number.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500/10 to-purple-600/10">
      <div className="relative p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-w-md w-full mx-4">
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20"></div>
        
        <form onSubmit={checkData} className="flex flex-col gap-6 relative z-10">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Check Your Details
            </h2>
            <p className="text-gray-400 text-sm mt-1">Enter your roll number below</p>
          </div>
          
          <div className="relative group">
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter Roll Number"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent
                transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/40 to-purple-600/40 opacity-0 
              group-hover:opacity-100 blur transition duration-300 -z-10"></div>
          </div>

          <button 
            type="submit" 
            className="relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-medium shadow-lg hover:shadow-blue-500/25 
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Check Details</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
              onClick={() => window.history.back()}
              className="mt-4 relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600
                text-white font-medium shadow-lg hover:shadow-blue-500/25 
                transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Go Back</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </form>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <section className="mt-6 p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 relative">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20"></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              congratualtions you are eligible 
            </h1>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="text-gray-700">Name:</span> {data.name}
              </p>
              <p className="text-gray-700">
                <span className="text-gray-700">Phone:</span> {data.phone}
              </p>
            </div>
            
          </div>
          
        </section>
      )}
    </div>
  );
};

export default CheckMyDetails;
