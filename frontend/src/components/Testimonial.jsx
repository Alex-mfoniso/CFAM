import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    image: "https://storage.googleapis.com/a1aa/image/MUbkbTlgUlwtgxQme3orzVq9fNqhm45WT7h61MgIwgM.jpg",
    quote: "Our church is nothing short of a warm, lovely, and supportive community.",
    name: "Karen Cutts",
    location: "Los Angeles, CA",
  },
  {
    image: "https://storage.googleapis.com/a1aa/image/F4fr_wQMiO9e27VDb9bYRrjJtC70PRSewD-LtObmXuM.jpg",
    quote: "A place where faith and love come together to inspire and uplift.",
    name: "James Carter",
    location: "Houston, TX",
  },
  {
    image: "https://storage.googleapis.com/a1aa/image/MUbkbTlgUlwtgxQme3orzVq9fNqhm45WT7h61MgIwgM.jpg",
    quote: "This church has given me a true sense of belonging and family.",
    name: "Emily Watson",
    location: "New York, NY",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  // Framer Motion controls for the animated div
  const controls = useAnimation();

  // Intersection Observer to detect when the static right section is in view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Trigger animation when the section comes into view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen px-4 py-8">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center relative">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4 relative">
          <motion.img
            key={testimonials[index].image}
            src={testimonials[index].image}
            alt="Community Member"
            className="w-full h-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Testimonial Text Overlay */}
          <motion.div
            key={testimonials[index].quote}
            className="absolute bottom-[-1.5rem] right-4 bg-white p-4 md:p-6 rounded-lg shadow-lg w-4/5 md:w-3/5 border border-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <p className="text-lg font-semibold mb-2">“{testimonials[index].quote}”</p>
            <p className="text-sm text-gray-600">{testimonials[index].name}</p>
            <p className="text-sm text-gray-600">{testimonials[index].location}</p>

            {/* Navigation Buttons */}
            <div className="flex mt-4 space-x-4">
              <button
                className="text-gray-600 hover:text-black transition-transform transform hover:scale-110"
                onClick={handlePrev}
              >
                <FaChevronLeft className="text-2xl" />
              </button>
              <button
                className="text-gray-600 hover:text-black transition-transform transform hover:scale-110"
                onClick={handleNext}
              >
                <FaChevronRight className="text-2xl" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Static Right Section */}
        <div ref={ref} className="w-full md:w-1/2 p-4 flex flex-col justify-center mt-[3rem]">
          {/* Animated Div */}
          <motion.div
            className="w-16 h-1 bg-black mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={controls}
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          />

          <h2 className="text-2xl md:text-3xl font-bold mb-2">Hear what our community says</h2>
          <p className="text-gray-600 mb-4 text-lg">
            Find inspiration and encouragement from our church family’s stories.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;