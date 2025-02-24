import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { assets } from "../assets/asset";

const ChurchPage = () => {
  // Framer Motion controls for animations
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const borderControls1 = useAnimation();
  const borderControls2 = useAnimation();

  // Intersection Observer hooks to detect when elements are in view
  const [section1Ref, section1InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [section2Ref, section2InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Trigger animations when elements come into view
  React.useEffect(() => {
    if (section1InView) {
      controls1.start("visible");
      borderControls1.start("visible");
    }
  }, [controls1, borderControls1, section1InView]);

  React.useEffect(() => {
    if (section2InView) {
      controls2.start("visible");
      borderControls2.start("visible");
    }
  }, [controls2, borderControls2, section2InView]);

  // Animation variants for Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const borderVariants = {
    hidden: { scaleX: 0 }, // Start with no width
    visible: {
      scaleX: 1, // Animate to full width
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Section 1 */}
      <div
        ref={section1Ref}
        className="bg-gray-100 min-h-screen flex flex-col md:flex-row items-center justify-end px-6 relative"
      >
        {/* Left Section */}
        <motion.div
          className="bg-white p-8 md:w-1/2 relative z-10 md:-mr-16 md:rounded-lg -mb-12 md:mt-0"
          variants={sectionVariants}
          initial="hidden"
          animate={controls1}
        >
          {/* First Animated Border */}
          <motion.div
            className="border-t-4 border-black w-12 mb-4"
            style={{ originX: 0 }} // Set the origin of the animation to the left
            variants={borderVariants}
            initial="hidden"
            animate={borderControls1}
            transition={{ delay: 0 }} // No delay for the first border
          />
          <h1 className="text-4xl font-bold mb-4">
            In our church, we love and trust Jesus
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna vitae
            ac vitae lacus ac proin ultricies eleifend dui ut felis bibendum ut
            amet nunc turpis diam urna quam congue. Tortor in egestas imperdiet
            posuere duis enim lectus consectetur arcu ac id in mauris.
          </p>
          <button className="bg-black text-white py-3 px-6 font-bold rounded-md hover:scale-105 hover:bg-gray-900 transition-all duration-300">
            STATEMENT OF FAITH
          </button>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="md:w-1/2 relative"
          variants={imageVariants}
          initial="hidden"
          animate={controls1}
        >
          <img
            src={assets.sof}
            alt="A hand raised in worship with a blurred background of a church service"
            className="w-full h-[30rem] object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Section 2 */}
      <div
        ref={section2Ref}
        className="bg-gray-100 pt-[2rem] min-h-screen flex flex-col-reverse md:flex-row items-center justify-end px-6 relative"
      >
        {/* Right Section */}
        <motion.div
          className="md:w-1/2 relative z-10 md:-ml-16 -mt-12 md:mt-0"
          variants={imageVariants}
          initial="hidden"
          animate={controls2}
        >
          <img
            src={assets.pst}
            alt="A hand raised in worship with a blurred background of a church service"
            className="w-full h-[30rem] object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Left Section */}
        <motion.div
          className="bg-white p-8 md:w-1/2 relative z-10 md:-ml-16 md:rounded-lg md:mt-0"
          variants={sectionVariants}
          initial="hidden"
          animate={controls2}
        >
          {/* Second Animated Border */}
          <motion.div
            className="border-t-4 border-black w-12 mb-4"
            style={{ originX: 0 }} // Set the origin of the animation to the left
            variants={borderVariants}
            initial="hidden"
            animate={borderControls2}
            transition={{ delay: 0.8 }} // Delay for the second border
          />
          <h1 className="text-4xl font-bold mb-4">
          Meet John & Sophie,our beloved pastors
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna vitae
            ac vitae lacus ac proin ultricies eleifend dui ut felis bibendum ut
            amet nunc turpis diam urna quam congue. Tortor in egestas imperdiet
            posuere duis enim lectus consectetur arcu ac id in mauris.
          </p>
          <button className="bg-black text-white py-3 px-6 font-bold rounded-md hover:scale-105 hover:bg-gray-900 transition-all duration-300">
            MORE ABOUT US
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChurchPage;