import { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; 
// import { FaFacebook, FaInstagram, FaTiktok, FaEnvelope, FaPhone } from "react-icons/fa";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};


const center = {
  lat: 40.7128, 
  lng: -74.0060,
};


const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const Contact = () => {
 
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
{/*    
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>

      
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Our Address</h3>
          
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
          <p className="mt-2 text-gray-700">123 Main Street, New York, NY 10001</p>

     
          <div className="mt-4 flex items-center justify-center space-x-4 text-gray-700">
            <FaPhone className="text-xl" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-4 text-gray-700">
            <FaEnvelope className="text-xl" />
            <span>contact@yourwebsite.com</span>
          </div>
        </div>

      
        <div className="mt-6 flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:scale-110 transition">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-2xl hover:scale-110 transition">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black text-2xl hover:scale-110 transition">
            <FaTiktok />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;