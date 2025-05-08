import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Ensure this file exists
import { Analytics } from "@vercel/analytics/react";
// import Contact from "./pages/Contact";
import { registerAdmin,  } from "./registerAdmin";

const App = () => {
  useEffect(() => {
    // registerAdmin("alexandermfoniso21@gmail.com", "SecurePassword123");
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <Analytics />
    </AuthProvider>
  );
};

export default App;
// import React from "react";
// import "./App.css";
// import UseStateComponent from "../src/state/UseStateComponent"; 
// import UseState2 from "../src/state/UseState2";
// import UseState3 from "../src/state/UseState3";
// import UseCback from "../src/state/UseCback"
// function App() {
 
//   return (
   
//   //  <UseStateComponent/>
//   <UseCback/>
    
//   );
// }

// export default App;
