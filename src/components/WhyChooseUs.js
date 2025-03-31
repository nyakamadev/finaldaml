import React from "react";
import { Link } from "react-router-dom";
import "./WhyChooseUs.css";

// Placeholder images (replace with actual images)
import image1 from "../assets/pages/st1 (2).jpg";
import image2 from "../assets/pages/st1 (3).jpg";
import image3 from "../assets/pages/st1 (4).jpg";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="wcu-container">
        {/* Left Side: Images */}
        <div className="wcu-images">
          <div className="wcu-image-wrapper">
            <div className="wcu-image wcu-image-1">
              <img src={image1} alt="Student 1" />
            </div>
            <div className="wcu-image wcu-image-2">
              <img src={image2} alt="Student 2" />
            </div>
            <div className="wcu-image wcu-image-3">
              <img src={image3} alt="Student 3" />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="wcu-content">
          <h3 className="wcu-subheading">One Step Closer!</h3>
          <h2 className="wcu-heading">Why Choose Us?</h2>
          <p>
            Dare to dream? Think of a bright future you want to forge. You don’t
            settle for less, so here are “some cool reasons” to choose Suesland
            Academy.
          </p>
          <Link to="/enroll" className="wcu-button">
            Enroll Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;