import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/asset";

const events = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Join us every Sunday at 10 AM for an uplifting service.",
    link: "/events/sunday-service",
    image: assets.church
  },
  {
    id: 2,
    title: "Youth Conference",
    description: "Empowering young believers through faith and fellowship.",
    link: "/events/youth-conference",
    image: assets.church,
  },
  {
    id: 3,
    title: "Prayer Meeting",
    description: "A time of corporate prayer and intercession every Wednesday.",
    link: "/events/prayer-meeting",
    image: assets.church,
  },
  {
    id: 4,
    title: "Bible Study",
    description: "Deep dive into God’s Word every Friday at 6 PM.",
    link: "/events/bible-study",
    image: assets.church,
  },
];

const EventSlider = () => {
  const sliderRef = useRef(null);
  const [pause, setPause] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [pause]);

  // Move Next
  const handleNext = () => {
    if (sliderRef.current) {
      setPause(true);
      sliderRef.current.style.transition = "transform 0.6s ease-in-out";
      sliderRef.current.style.transform = "translateX(-100%)";

      setTimeout(() => {
        sliderRef.current.appendChild(sliderRef.current.firstElementChild);
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = "translateX(0)";
        setPause(false);
      }, 600);
    }
  };

  // Move Prev
  const handlePrev = () => {
    if (sliderRef.current) {
      setPause(true);
      sliderRef.current.prepend(sliderRef.current.lastElementChild);
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = "translateX(-100%)";

      setTimeout(() => {
        sliderRef.current.style.transition = "transform 0.6s ease-in-out";
        sliderRef.current.style.transform = "translateX(0)";
        setPause(false);
      }, 20);
    }
  };

  return (
    <section className="py-20 bg-gray-100 relative">
      <div className="container mx-auto px-8">
        {/* Heading & Buttons */}
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
            Upcoming Events
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden mt-10">
          <div ref={sliderRef} className="flex gap-6 w-full ">
            {[...events, ...events].map((event, i) => (
              <div
                key={i}
                className="min-w-[90%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[25%] bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-gray-700">{event.description}</p>
                  <Link
                    to={`/events/${event.link.split("/").pop()}`}
                    className="inline-block mt-4 px-5 py-3 button text-white text-lg font-semibold rounded-lg transition duration-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
  <Link
    to="/events"
    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    Browse More Events
  </Link>
</div>

        
      </div>
    </section>
  );
};

export default EventSlider;
