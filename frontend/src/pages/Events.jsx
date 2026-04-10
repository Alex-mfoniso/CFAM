import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaSearch, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const events = [
  {
    id: "sunday-service",
    date: "Oct 22, 2021",
    time: "9:00 AM",
    title: "Healing and Deliverance Meeting",
    description: "Join us for a powerful healing service where we experience the manifest presence of God. A time of restoration, prayer, and divine encounters for everyone seeking a touch from the Almighty.",
    category: "monthly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "youth-conference",
    date: "Nov 15, 2021",
    time: "11:00 AM",
    title: "Youth Impact Conference",
    description: "Empowering the next generation of believers to lead with faith and purpose. Featuring dynamic speakers, worship sessions, and workshops designed to ignite your spiritual passion.",
    category: "weekly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "prayer-meeting",
    date: "Dec 5, 2021",
    time: "6:00 PM",
    title: "Mid-Week Breakthrough Prayer",
    description: "Mid-week corporate prayer and intercession. Join the family of Christ as we lift our voices in one accord, seeking breakthrough and divine guidance for our community and world.",
    category: "monthly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "bible-study",
    date: "Jan 10, 2022",
    time: "7:30 PM",
    title: "Deep Dive Bible Study",
    description: "Unpacking the profound truths of the Scriptures. Every Friday evening, we gather to explore the Word of God together, growing in knowledge and wisdom through structured teaching.",
    category: "yearly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
];

const Events = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || event.category === filter)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Hero Section */}
      <section className="bg-[rgb(24,24,27)] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-zinc-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 relative z-10 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Events</span>
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join us for transformative worship, fellowship, and community activities. There&apos;s a place for everyone in the family of God.
        </motion.p>
      </section>

      {/* Filter Bar - Sticky with offset for Navbar */}
      <div className="bg-white sticky top-[68px] md:top-[80px] z-40 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-purple-500 text-gray-700 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <FaFilter className="text-purple-600 hidden md:block" />
            <select
              className="flex-1 md:w-48 p-2.5 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="weekly">Weekly Activities</option>
              <option value="monthly">Monthly Events</option>
              <option value="yearly">Yearly Events</option>
              <option value="occasion">Special Occasions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-6xl mx-auto px-6 py-16 w-full flex-grow">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-2xl italic font-medium">
              No events match your current search criteria.
            </p>
            <button 
              onClick={() => {setSearch(""); setFilter("all");}}
              className="mt-6 text-purple-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex flex-col lg:flex-row items-stretch bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image Container */}
                <div className="lg:w-2/5 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full min-h-[300px] object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {event.category.toUpperCase()}
                  </div>
                </div>

                {/* Content Container */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-6 text-sm md:text-base font-semibold text-purple-600 mb-4 opacity-80">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-[rgb(20,15,45)] mb-4 leading-tight group-hover:text-purple-700 transition">
                    {event.title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link
                      to={`/events/${event.id}`}
                      className="button inline-flex items-center gap-2 px-8 py-3.5"
                    >
                      More Details <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
