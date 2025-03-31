import React from "react";
import Hero from "../components/Hero";
import ProgramCards from "../components/ProgramCards";
import DiscoverSection from "../components/DiscoverSection";
import VisionMissionValues from "../components/VisionMissionValues";
import WhyChooseUs from "../components/WhyChooseUs";
import WhyChooseUsDetails from "../components/WhyChooseUsDetails";
import InTheNews from "../components/InTheNews";
import TestimonialSlider from "../components/TestimonialSlider"; // Import the new component
import "./Overview.css";
import Footer from "../components/Footer";

function Overview() {
  return (
    <div className="overview">
      <Hero />
      <ProgramCards />
      <DiscoverSection />
      <VisionMissionValues />
      <WhyChooseUs />
      <WhyChooseUsDetails />
      <InTheNews />
      <TestimonialSlider />
      <Footer/>
    </div>
  );
}

export default Overview;