import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="text-white"
      style={{ background: 'rgb(24, 24, 27)' }} // Neutral Charcoal
    >
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-start text-gray-400"><MapPin className="mr-2" size={20} /> 10 in front of my house</p>
          <p className="flex items-center justify-center md:justify-start text-gray-400 mt-2"><Phone className="mr-2" size={20} />+234 911 356 2352</p>
          <p className="flex items-center justify-center md:justify-start text-gray-400 mt-2"><Mail className="mr-2" size={20} /> cfam@gmail.com</p>
        </motion.div>
 
        {/* Subscribe to Newsletter */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mb-4">Stay updated with the latest news and events from our church.</p>
          <form onSubmit={handleSubscribe} className="relative w-full">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full rounded-md pr-32 bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className={`absolute top-1/2 right-1.5 transform -translate-y-1/2 button py-2 px-4 text-sm ${
                isSubscribing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-gray-400"><Facebook size={24} /></a>
            <a href="#" className="hover:text-gray-400"><Twitter size={24} /></a>
            <a href="#" className="hover:text-gray-400"><Instagram size={24} /></a>
            <a href="#" className="hover:text-gray-400"><Youtube size={24} /></a>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-700 py-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} CFAM | All Rights Reserved</p>
      </div>
    </motion.div>
  );
};

export default Footer;
