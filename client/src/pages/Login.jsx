import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import axios
import { use } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "./UserContext";

const Login = () => {
  const [data, setData] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo

    try {
      const response = await axios.post("http://localhost:5000/login", {
        rollNo: data,
      });
      setUser(response.data.student);

      if (response.data.error) {
        toast.success(response.data.error);
        console.log(response.data);
      } else {
        navigate("/dashboard");
        toast.success("login succesful");
        setData("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-[45px]">Login</h1>
      <div className="h-[500px] w-full flex flex-col justify-center items-center">
        <div className="w-[400px] h-[450px] bg-gray-500/50 backdrop-blur-lg flex flex-col justify-center items-center">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="capitalize">Roll No</label>
            <input
              type="text"
              className="text-black w-[300px] px-2 py-1 rounded-md"
              value={data}
              onChange={(e) => setData(e.target.value)} // Corrected event
            />
            <button
              type="submit"
              className="bg-black text-white py-3 w-[250px] rounded-3xl mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
