import React from "react";
import Hero from "../components/Hero";
import EventSlider from "../components/EventSlider";
import ChurchPage from "../components/ChurchPage";
import Sermon from "../components/Sermon";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* Upcoming Events Section */}
      <EventSlider />
      <hr />
      <ChurchPage />
      <Sermon />
      <Testimonial />
      <Footer />
    </div>
    //
  );
};

export default Home;
