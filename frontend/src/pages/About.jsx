import { assets } from "../assets/asset";
import { motion } from "framer-motion";
import { FaHeart, FaBullseye, FaQuoteLeft } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${assets.homeBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(20,15,45)]/80 via-[rgb(20,15,45)]/60 to-white"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Us</span>
          </motion.h1>
          <motion.p 
            className="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            We are a community of believers dedicated to sharing God&apos;s love and empowering lives through the transformative power of the Word.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button className="button py-4 px-10 text-lg">
              GET INVOLVED
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 font-bold rounded-xl hover:bg-white hover:text-[rgb(20,15,45)] transition-all">
              OUR STORY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Strength & Mission - Overlapping Cards Design */}
      <div className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {/* Our Strength */}
        <section className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={assets.strength}
                alt="Church Strength"
                className="w-full object-cover aspect-[4/5] lg:aspect-auto"
              />
            </div>
            {/* Design Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-3xl -z-0 opacity-20"></div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                <FaHeart size={24} />
              </div>
              <span className="text-purple-600 font-black tracking-widest uppercase text-sm">Our Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[rgb(20,15,45)] mb-8 leading-tight">
              In our church we <br />
              <span className="text-purple-600">trust</span> in the strength of God&apos;s love.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our community is built on the unwavering foundation of faith. We believe that through unity and spiritual devotion, we can overcome any obstacle and serve as a beacon of hope for our generation.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              &quot;For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.&quot; - 2 Timothy 1:7
            </p>
          </motion.div>
        </section>

        {/* Our Mission */}
        <section className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={assets.mission}
                alt="Church Mission"
                className="w-full object-cover aspect-[4/5] lg:aspect-auto"
              />
            </div>
            {/* Design Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-3xl -z-0 opacity-20"></div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                <FaBullseye size={24} />
              </div>
              <span className="text-purple-600 font-black tracking-widest uppercase text-sm">Divine Purpose</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[rgb(20,15,45)] mb-8 leading-tight">
              Our <span className="text-purple-600">Mission</span> is to ignite global transformation.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We are called to reach the unreached and tell the untold. Our mission extends beyond the four walls of our church building, reaching into the heart of our community through various ministries and outreach programs.
            </p>
            <button className="button py-4 px-10">
              LEARN MORE
            </button>
          </motion.div>
        </section>
      </div>

      {/* Pastors Section - Obsidian Design */}
      <div className="bg-[rgb(24,24,27)] py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gray-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-800 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <FaQuoteLeft className="text-gray-500 mx-auto mb-6 text-4xl opacity-50" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Meet our <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Pastors</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Guided by vision and fueled by compassion, our leadership is dedicated to your spiritual journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Pastor 1 */}
            <motion.div 
              className="bg-[rgb(25,20,55)] p-10 rounded-[40px] border border-white/5 hover:border-purple-500/30 transition-all duration-500 group"
              whileHover={{ y: -10 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-56 h-56 mb-8 relative">
                  <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl group-hover:opacity-60 transition opacity-0"></div>
                  <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-purple-500/50 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                      alt="Pastor John Carter"
                      className="w-full h-full object-cover rounded-full transition duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[rgb(255,200,80)] transition">
                    John Carter
                  </h3>
                  <p className="text-purple-400 font-black text-sm tracking-[0.2em] uppercase mb-6">
                    Principal Pastor
                  </p>
                  <p className="text-gray-400 leading-relaxed italic">
                    &quot;Leading our congregation with a heart for service and a vision for community growth is my life&apos;s greatest honor.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pastor 2 */}
            <motion.div 
              className="bg-[rgb(31,31,31)] p-10 rounded-[40px] border border-white/5 hover:border-purple-500/30 transition-all duration-500 group"
              whileHover={{ y: -10 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-56 h-56 mb-8 relative">
                  <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl group-hover:opacity-60 transition opacity-0"></div>
                  <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-purple-500/50 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                      alt="Pastor Sophie Carter"
                      className="w-full h-full object-cover rounded-full transition duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[rgb(255,200,80)] transition">
                    Sophie Carter
                  </h3>
                  <p className="text-purple-400 font-black text-sm tracking-[0.2em] uppercase mb-6">
                    Principal Pastor
                  </p>
                  <p className="text-gray-400 leading-relaxed italic">
                    &quot;Our mission is to empower every individual to discover their divine purpose and walk in the fullness of God&apos;s love.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
