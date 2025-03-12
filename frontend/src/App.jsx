import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <>
      <AppRoutes />
      <Analytics />
    </>
  );
};

export default App;
