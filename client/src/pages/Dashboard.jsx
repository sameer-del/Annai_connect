import React from "react";
import { useUser } from "../pages/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardView from "./DashboardView";
const Dashboard = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return <p>user not found</p>;
  }

  return (
    <section>
      <Navbar />
      <section className=" bg-amber-300">
        <div className="dashboard h-[50vh] bg-amber-100 flex justify-center items-center">
          <div className="bg-white flex-1 flex flex-col justify-center ml-[100px] h-full">
            <h1 className="text-[32px] font-[600] capitalize">{user.name}</h1>
            <h2 className="text-[32px] font-[600] capitalize">
              {user.roll_no}
            </h2>
            <h1 className="text-[32px] font-[600] capitalize">{user.phone}</h1>
            <h1 className="text-[32px] font-[600] capitalize">{user.email}</h1>
            <p className="text-[18px]">{user.bio}</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?uid=R164987910&ga=GA1.1.549507106.1727186775&semt=ais_hybrid"
              alt="ds"
              className="w-[400px] rounded-full"
            />
          </div>
        </div>
        <DashboardView />
      </section>
    </section>
  );
};

export default Dashboard;
