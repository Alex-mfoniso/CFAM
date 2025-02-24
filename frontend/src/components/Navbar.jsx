import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { assets } from '../assets/asset';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md navbar">
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
        </div>

        {/* Mobile Menu Button with Animation */}
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

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-4 navbar" >
              <Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/sermons" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Sermons</Link>
              <Link to="/events" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Events</Link>
              <Link to="/giving" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Giving</Link>
              <Link to="/contact" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
