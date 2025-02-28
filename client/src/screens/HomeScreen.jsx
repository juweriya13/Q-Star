import React from "react";
import Nav from "../components/Navbar";
import Hero from "../components/Hero";
import EventsTab from "../components/Event/EventsTab";
import Statistics from "../components/Statistics";
import Footer from "../components/Footer";

function HomeScreen() {
  return (
    <div>
      <Nav />
        <Hero />
      <div className="px-10">
        <Statistics />
        {/* <EventsTab/> */}
        {/* <Testimonals/> */}
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
