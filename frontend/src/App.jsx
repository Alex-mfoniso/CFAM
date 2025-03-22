import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
import Contact from "./pages/Contact";
import { setAdminRole } from "./assignAdmin"; // Import the function

const App = () => {
  useEffect(() => {
    setAdminRole("OODmIqUK5LfdWvFuE2i6FIGi9tP2"); // Replace with actual user UID
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <Analytics />
    </AuthProvider>
  );
};

export default App;
