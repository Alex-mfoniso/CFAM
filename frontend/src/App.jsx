import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute"; 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <>
    <AuthProvider>
      <AppRoutes />
      <Analytics />
      </AuthProvider>
    </>
  );
};

export default App;
