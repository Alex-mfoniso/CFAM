import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/asset";
import EventSlider from "../components/EventSlider";
import ChurchPage from "../components/ChurchPage";
import Sermon from "../components/Sermon";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center text-white"
        style={{ backgroundImage: `url(${assets.homeBg})` }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content with Animation */}
        <div className="container mx-auto px-6 text-center relative">
          {/* Animated Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome To The Family
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="mt-4 text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            Join us in worship and fellowship
          </motion.p>

          {/* Animated Buttons */}
          <motion.div
            className="mt-6 flex justify-center space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <Link
              to="/about"
              className="py-3 px-6 rounded-lg button transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
            <Link
              to="/live"
              className="py-3 px-6 rounded-lg button transition-all duration-300 transform hover:scale-105"
            >
              Watch Live
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Upcoming Events Section */}
      <EventSlider />
      <hr className="" />
      <ChurchPage />
      <Sermon/>
      <Testimonial />
    </div>
  );
};

export default Home;
