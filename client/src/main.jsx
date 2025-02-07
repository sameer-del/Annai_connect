import { StrictMode } from "react";
import React from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./pages/UserContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </StrictMode>
);
