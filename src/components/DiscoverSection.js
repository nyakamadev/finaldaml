import React from "react";
import discoverImage from "../assets/m1.jpg";
import "./DiscoverSection.css";

const DiscoverSection = () => {
  return (
    <section className="discover-section">
      <div className="discover-content">
        <h2>
          Discover more about <br /> Suesland Academy
        </h2>
        <p>
          Welcome to Suesland Academy, a nurturing space where children thrive
          academically, socially, and emotionally. We specialize in providing a
          strong foundation for children from daycare to grade 4.
        </p>
      </div>
      <div className="discover-image">
        <div className="image-wrapper">
          <img src={discoverImage} alt="Children at Suesland Academy" />
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;