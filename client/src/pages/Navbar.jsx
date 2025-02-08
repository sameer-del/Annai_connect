import React from "react";
import { useUser } from "./UserContext";
const Navbar = () => {
  const { user, setUser } = useUser();
  const handleClick = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <section>
      <div className="navbar h-[90px]  flex justify-between items-center max-w-[85%]  ">
        <div className="flex justify-center items-center">
          <div>
            <img src="/annai-logo.png" alt="" className="w-[80px]" />
          </div>
          <h1 className="text-[25px] capitalize">BCA department Gallery</h1>
        </div>
        <div className="flex  justify-between items-center w-[300px]">
          <h1 className="text-[19px] capitalize">{user.name}</h1>
          <button onClick={handleClick} className="">
            log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
