import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
import Contact from "./pages/Contact";
import { registerAdmin, } from "./registerAdmin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    registerAdmin("alexandermfoniso25@gmail.com", "SecurePassword123");
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <Analytics />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </AuthProvider>
  );
};

export default App;