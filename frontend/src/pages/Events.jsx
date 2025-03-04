import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";



const events = [
  {
    id: "sunday-service",  // Unique string IDs that match `eventData`
    date: "Oct 22, 2021",
    time: "9:00 AM",
    title: "Healing and Deliverance Meeting",
    description: "Join us for a powerful healing service.",
    category: "monthly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "youth-conference",
    date: "Nov 15, 2021",
    time: "11:00 AM",
    title: "Youth Conference",
    description: "A gathering for young believers.",
    category: "weekly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "prayer-meeting",
    date: "Dec 5, 2021",
    time: "6:00 PM",
    title: "Prayer Meeting",
    description: "Join us for prayer every Wednesday.",
    category: "monthly",
    image: "https://storage.googleapis.com/a1aa/image/N9SzQo3BkgMtbbe43UaXrL1tWBS1mxYlwVXtfZi690g.jpg",
  },
  {
    id: "bible-study",
    date: "Jan 10, 2022",
    time: "7:30 PM",
    title: "Bible Study",
    description: "Deep dive into God’s Word every Friday.",
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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-12">
      <div className="flex flex-col md:flex-row w-full md:w-4/5 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 border border-gray-300 rounded-md mb-4 md:mb-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="weekly">Weekly Activities</option>
          <option value="monthly">Monthly Events</option>
          <option value="yearly">Yearly Events</option>
          <option value="occasion">Occasions</option>
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-red-500 text-xl font-semibold">
          No events found. Please try a different search term.
        </p>
      ) : (
        filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            className="flex flex-col md:flex-row items-center justify-center w-full md:w-4/5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-full md:w-2/5 relative z-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-[30rem] h-[30rem] object-cover rounded-lg shadow-2xl"
              />
            </div>

            <div className="w-full md:w-3/5 bg-white p-10 rounded-lg shadow-2xl relative z-10 md:-ml-20 mt-8 md:mt-0">
              <div className="flex items-center text-gray-600 text-lg">
                <FaCalendarAlt className="mr-2 text-orange-500" />
                <span>{event.date}</span>
                <span className="mx-2">—</span>
                <FaClock className="mr-2 text-orange-500" />
                <span>{event.time}</span>
              </div>
              <h2 className="text-orange-500 text-4xl font-bold mt-6">
                {event.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mt-6">
                {event.description}
              </p>
              <Link
                to={`/events/${event.id}`}
                className="button inline-block mt-8 px-8 py-3 font-semibold rounded-lg transition duration-300"
              >
                MORE DETAILS
              </Link>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Events;
