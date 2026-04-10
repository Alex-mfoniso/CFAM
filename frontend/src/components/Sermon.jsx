import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPlay } from "react-icons/fa";

const Sermon = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="bg-[rgb(24,24,27)] text-white py-24 px-6 relative overflow-hidden">
      {/* Abstract Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gray-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-zinc-800 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Heading Section */}
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <div className="w-20 h-1.5 bg-purple-500 mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Watch and Experience <br />
            Our <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Latest Sermon</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join our community as we explore deep spiritual truths and the transformative power of God&apos;s word. Engage, learn, and be inspired by our recent message.
          </p>
        </motion.div>

        {/* Cinematic Video Section */}
        <motion.div 
          className="relative w-full max-w-4xl p-1 bg-white/5 rounded-[40px] backdrop-blur-sm border border-white/10 shadow-2xl group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.8 } }
          }}
        >
          <div className="absolute -inset-4 bg-purple-600/10 rounded-[50px] blur-2xl group-hover:bg-purple-600/20 transition duration-700"></div>
          
          <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_SERMON_VIDEO_ID"
              title="Church Sermon"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Decorative Play Indicator */}
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition duration-500">
            <FaPlay className="text-white text-2xl ml-1" />
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-20">
          <a
            href="#"
            className="button py-4 px-12 text-lg shadow-[0_10px_30px_rgba(110,50,150,0.3)]"
          >
            GET INVOLVED
          </a>
          <a
            href="#"
            className="border-2 border-white/10 text-white px-12 py-4 font-black rounded-2xl hover:bg-white hover:text-[rgb(20,15,45)] transition-all flex items-center justify-center"
          >
            OUR MINISTRIES
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sermon;