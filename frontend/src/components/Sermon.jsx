import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Sermon = () => {
  // Framer Motion controls
  const controls = useAnimation();

  // Intersection Observer to detect when the div is in view
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Trigger animation when the div is in view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const expandVariants = {
    hidden: { scaleX: 0 }, // Start with no width
    visible: {
      scaleX: 1, // Animate to full width
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated Top Decoration */}

      <div className="text-center max-w-2xl mx-auto">
        {/* Heading Section */}
        <div className="mb-6 pt-12"> {/* Added padding-top to push the animated div down */}
          {/* Animated Div */}
          <motion.div
            ref={ref}
            className="w-16 h-1 bg-white mx-auto mb-4"
            style={{ originX: 0 }} // Set the origin of the animation to the left
            variants={expandVariants}
            initial="hidden"
            animate={controls}
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Watch and Experience Our Latest Sermon
          </h1>
          <p className="text-gray-400 mb-8">
            Join us as we explore faith and the word of God. Engage, learn, and
            be inspired by our latest sermon.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative group mb-8">
        <iframe
              className="w-full md:w-3/4 lg:w-1/2 mx-auto rounded-lg"
              height="315"
              src="https://www.youtube.com/embed/YOUR_SERMON_VIDEO_ID"
              title="Church Sermon"
              allowFullScreen
            ></iframe>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <a
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
            href="#"
          >
            GET INVOLVED
          </a>
          <a
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
            href="#"
          >
            OUR MINISTRIES
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sermon;