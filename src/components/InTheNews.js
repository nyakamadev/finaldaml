import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./InTheNews.css";

// Placeholder images (replace with actual images)
import newsImage1 from "../assets/pages/st3 (3).jpg";
import newsImage2 from "../assets/pages/_MG_2093.jpg";

const InTheNews = () => {
  return (
    <section className="in-the-news">
      <h2 className="itn-heading">In the News</h2>
      <div className="itn-cards">
        {/* Card 1 */}
        <div className="itn-card">
          <div className="itn-image">
            <img src={newsImage1} alt="News 1" />
          </div>
          <div className="itn-content">
            <h3>Suesland Academy Celebrates Annual Faith Festival</h3>
            <p>
              Our students showcased their talents at the Annual Faith Festival, a
              celebration of Christian values, creativity, and community spirit.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="itn-card">
          <div className="itn-image">
            <img src={newsImage2} alt="News 2" />
          </div>
          <div className="itn-content">
            <h3>Outstanding Academic Achievements Recognized</h3>
            <p>
              Suesland Academy students excelled in regional academic competitions,
              earning top honors and showcasing their dedication to excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows at the Bottom */}
      <div className="itn-nav-buttons">
        <Link to="/blog">
          <button className="itn-nav-button itn-nav-left">
            <FaArrowLeft />
          </button>
        </Link>
        <Link to="/blog">
          <button className="itn-nav-button itn-nav-right">
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default InTheNews;