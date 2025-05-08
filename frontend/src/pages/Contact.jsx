import { useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

        {/* Contact Form */}
        <form action="https://formsubmit.co/alexandermfoniso18@gmail.com" method="POST" className="space-y-4">
  <input type="hidden" name="_subject" value="New Contact Form Submission" />
  <input type="hidden" name="_captcha" value="false" />

  <div>
    <label className="block text-gray-700 font-medium mb-2">Name</label>
    <input type="text" name="name" className="w-full p-3 border rounded-lg" placeholder="Your Name" required />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Email</label>
    <input type="email" name="email" className="w-full p-3 border rounded-lg" placeholder="Your Email" required />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Message</label>
    <textarea name="message" className="w-full p-3 border rounded-lg" placeholder="Your Message" rows="4" required></textarea>
  </div>
  <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
    Send Message
  </button>
</form>


        {/* Address & Embedded Map */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Our Address</h3>
          <p className="mt-2 text-gray-700"> 10 in front of my house</p>

          {/* Embedded Google Map */}
          <div className="mt-4">
            <iframe
              title="Google Map"
              width="100%"
              height="300"
              className="rounded-lg border"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8473725468723!2d-74.00858308459164!3d40.7127761793316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a176b3cb33b%3A0xb5b64166cd438933!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="mt-4 flex items-center justify-center space-x-4 text-gray-700">
            <FaPhone className="text-xl" />
            <span>+234 911 356 2352</span>
          </div>
          <div className="mt-2 flex items-center justify-center space-x-4 text-gray-700">
            <FaEnvelope className="text-xl" />
            <span>cfam@gmail.com</span>
          </div>
        </div>

        {/* Social Media Links */}
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
      </div>
    </div>
  );
};

export default Contact;
