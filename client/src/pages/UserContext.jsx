import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser):null;
  });

  useEffect(()=>{
    if(user){
      localStorage.setItem("user",JSON.stringify(user))
    }else{
      localStorage.removeItem("user")
    }
  },[user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
