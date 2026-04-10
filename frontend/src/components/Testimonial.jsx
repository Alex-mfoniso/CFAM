import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    image: "https://storage.googleapis.com/a1aa/image/MUbkbTlgUlwtgxQme3orzVq9fNqhm45WT7h61MgIwgM.jpg",
    quote: "Our church is nothing short of a warm, lovely, and supportive community. I've found a home where my faith can truly flourish alongside a family that cares.",
    name: "Karen Cutts",
    location: "Los Angeles, CA",
  },
  {
    image: "https://storage.googleapis.com/a1aa/image/F4fr_wQMiO9e27VDb9bYRrjJtC70PRSewD-LtObmXuM.jpg",
    quote: "A place where faith and love come together to inspire and uplift. Every message speaks directly to the soul and empowers us for the week ahead.",
    name: "James Carter",
    location: "Houston, TX",
  },
  {
    image: "https://storage.googleapis.com/a1aa/image/MUbkbTlgUlwtgxQme3orzVq9fNqhm45WT7h61MgIwgM.jpg",
    quote: "This church has given me a true sense of belonging. The ministries here are impactful and the community is genuine in every single interaction.",
    name: "Emily Watson",
    location: "New York, NY",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[rgb(24,24,27)] py-24 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-600/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Large Visual Area */}
        <div className="w-full lg:w-1/2 relative pr-12">
          <motion.div 
             className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl border-4 border-white/5"
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={testimonials[index].image}
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-full aspect-[4/5] md:aspect-square object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Accent Element */}
          <div className="absolute -bottom-8 -right-4 lg:-right-8 w-48 h-48 bg-gray-600 rounded-[40px] -z-0 opacity-10 blur-xl"></div>
          <div className="absolute top-12 -left-8 w-16 h-16 bg-[rgb(255,200,80)] rounded-2xl flex items-center justify-center text-[rgb(40,30,80)] shadow-xl z-20">
            <FaQuoteRight size={32} />
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div ref={ref} className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400 font-black tracking-[0.2em] uppercase text-sm mb-6 block">
              Voices of our Family
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Hear what our <br />
              <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">community</span> says
            </h2>
            
            <div className="relative min-h-[250px] mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-gray-200 leading-relaxed mb-8 italic">
                    &quot;{testimonials[index].quote}&quot;
                  </p>
                  <div>
                    <h4 className="text-xl font-black text-[rgb(255,200,80)]">
                      {testimonials[index].name}
                    </h4>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                      {testimonials[index].location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <button className="button py-4 px-10">
                GET INVOLVED
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-300"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;