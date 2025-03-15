import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/asset";
import { useAuth } from "../contexts/AuthContext"; // Import Auth context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user & logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
    setIsOpen(false); // Close the menu
  };

  return (
    <nav className=" shadow-md navbar">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src={assets.logo} alt="Logo" className="w-16 sm:w-20 md:w-24 lg:w-20 xl:w-14 h-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/sermons" className="hover:text-blue-600">Sermons</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <Link to="/giving" className="hover:text-blue-600">Giving</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>

          {/* Authentication Links */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Icon */}
              <button 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-6 h-6" />
                {user.displayName || "Profile"}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48  shadow-md rounded-md overflow-hidden"
                  >
                    <Link to="/dashboard" className="block px-4 py-2">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <motion.div 
            initial={{ rotate: 0 }} 
            animate={{ rotate: isOpen ? 180 : 0 }} 
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="md:hidden navbar shadow-md overflow-hidden"
    >
      <div className="flex flex-col items-center text-center space-y-4 px-6 py-4">
        <Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/sermons" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Sermons</Link>
        <Link to="/events" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Events</Link>
        <Link to="/giving" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Giving</Link>
        <Link to="/contact" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link>

        {/* Authentication Links */}
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-center" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-left w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
