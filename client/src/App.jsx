import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { useUser } from "./pages/UserContext";
import StudentDetails from "./pages/StudentDetails";
import CheckMyDetails from "./pages/CheckMyDetails";
import AddStudent from "./pages/admin/AddStudent";
import Admin from "./pages/admin/Admin";
import EditStudent from "./pages/EditDetails";
function App() {
  function ProtectedRoutes({ children }) {
    const { user } = useUser();
    return user ? children : <Login />;
  }
  return (
    <>
      <BrowserRouter>
        <Toaster position=" right top" toastOptions={{ duration: 5000 }} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="/student/:rollNo" element={<StudentDetails />} />
          <Route path="/viewDetails" element={<CheckMyDetails />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/student/:rollNo/edit" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
