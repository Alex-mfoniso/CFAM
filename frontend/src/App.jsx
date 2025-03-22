import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
import Contact from "./pages/Contact";
import { registerAdmin, setAdminRole } from "./registerAdmin"; 

const App = () => {
  useEffect(() => {
    registerAdmin("alexandermfoniso21@gmail.com", "SecurePassword123");
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <Analytics />
    </AuthProvider>
  );
};

export default App;
