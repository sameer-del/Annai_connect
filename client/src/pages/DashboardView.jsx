import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const DashboardView = () => {
    const navigate = useNavigate();
  const [students, setstudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setstudents(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="dashboardview">
      <div className="grid grid-cols-3 place-items-center gap-5">
        {students.map((student) => (
          <div
            key={student.id}
            className="w-[450px] h-[350px] rounded-[15px] bg-amber-50 "
          >
            <div className="fields flex justify-center items-center ">
              <img
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?uid=R164987910&ga=GA1.1.549507106.1727186775&semt=ais_hybrid"
                alt="ds"
                className="w-[250px]  rounded-full"
              />
            </div>
            <div className="flex justify-center items-center flex-col">
              <h1>{student.name}</h1>
              <p>{student.phone}</p>
              <p>{student.bio}</p>
            </div>
            <div className="fields-button flex justify-center items-center">
              <button className="" onClick={()=>navigate(`/student/${student.roll_no}`)}>click</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardView;
