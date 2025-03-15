import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

import { ProtectedRoute } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";

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
