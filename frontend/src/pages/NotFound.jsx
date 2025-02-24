import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white px-6">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-extrabold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Animated Text */}
      <motion.p
        className="text-2xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Floating Button */}
      <motion.div
        className="mt-6"
        initial={{ y: 10 }}
        animate={{ y: -10 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
