import React, { useState } from "react";
import { FaCross, FaEye, FaChalkboardTeacher, FaShieldAlt, FaUsers } from "react-icons/fa";
import "./WhyChooseUsDetails.css";

// Placeholder images (replace with actual images)
import christianSchoolImage from "../assets/pages/st1 (2).jpg";
import visionOrientedImage from "../assets/pages/st1 (3).jpg";
import teachersImage from "../assets/pages/st1 (4).jpg";
import environmentImage from "../assets/pages/baker.jpg";
import classSizesImage from "../assets/pages/advisor.jpg";

const WhyChooseUsDetails = () => {
  // State to manage which section is expanded
  const [expandedSections, setExpandedSections] = useState({
    christianSchool: false,
    visionOriented: false,
    teachers: false,
    environment: false,
    classSizes: false,
  });

  // State to manage the currently displayed image
  const [currentImage, setCurrentImage] = useState(christianSchoolImage);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

    // Update the image based on the section being expanded
    switch (section) {
      case "christianSchool":
        setCurrentImage(christianSchoolImage);
        break;
      case "visionOriented":
        setCurrentImage(visionOrientedImage);
        break;
      case "teachers":
        setCurrentImage(teachersImage);
        break;
      case "environment":
        setCurrentImage(environmentImage);
        break;
      case "classSizes":
        setCurrentImage(classSizesImage);
        break;
      default:
        setCurrentImage(christianSchoolImage);
    }
  };

  return (
    <section className="why-choose-us-details">
      <div className="wcud-container">
        {/* Left Side: Image */}
        <div className="wcud-image">
          <img src={currentImage} alt="Suesland Academy" />
        </div>

        {/* Right Side: Content */}
        <div className="wcud-content">
          <h2 className="wcud-main-heading">Why Suesland Academy?</h2>
          <p className="wcud-description">
            Discover what makes Suesland Academy a nurturing and enriching environment for your child.
          </p>

          {/* Christian School */}
          <div className="wcud-detail-item">
            <div className="wcud-heading" onClick={() => toggleSection("christianSchool")}>
              <div className="wcud-heading-content">
                <FaCross className="wcud-icon" />
                <h4>Christian School</h4>
              </div>
              <span className={`wcud-toggle-icon ${expandedSections.christianSchool ? "expanded" : ""}`}>
                {expandedSections.christianSchool ? "−" : "+"}
              </span>
            </div>
            {expandedSections.christianSchool && (
              <div className="wcud-details">
                <p>
                  We integrate faith into our curriculum, fostering a spiritually enriching environment that promotes values like integrity, respect, and compassion.
                </p>
              </div>
            )}
          </div>

          {/* Vision Oriented */}
          <div className="wcud-detail-item">
            <div className="wcud-heading" onClick={() => toggleSection("visionOriented")}>
              <div className="wcud-heading-content">
                <FaEye className="wcud-icon" />
                <h4>Vision Oriented</h4>
              </div>
              <span className={`wcud-toggle-icon ${expandedSections.visionOriented ? "expanded" : ""}`}>
                {expandedSections.visionOriented ? "−" : "+"}
              </span>
            </div>
            {expandedSections.visionOriented && (
              <div className="wcud-details">
                <p>
                  Built on Christian principles, we instill purpose and direction, preparing students for lifelong success with passion and determination.
                </p>
              </div>
            )}
          </div>

          {/* Highly Qualified and Caring Teachers */}
          <div className="wcud-detail-item">
            <div className="wcud-heading" onClick={() => toggleSection("teachers")}>
              <div className="wcud-heading-content">
                <FaChalkboardTeacher className="wcud-icon" />
                <h4>Highly Qualified and Caring Teachers</h4>
              </div>
              <span className={`wcud-toggle-icon ${expandedSections.teachers ? "expanded" : ""}`}>
                {expandedSections.teachers ? "−" : "+"}
              </span>
            </div>
            {expandedSections.teachers && (
              <div className="wcud-details">
                <p>
                  Our expert educators are passionate mentors, dedicated to nurturing each student’s emotional and intellectual growth through continuous professional development.
                </p>
              </div>
            )}
          </div>

          {/* Safe, Secure, and Stimulating Environment */}
          <div className="wcud-detail-item">
            <div className="wcud-heading" onClick={() => toggleSection("environment")}>
              <div className="wcud-heading-content">
                <FaShieldAlt className="wcud-icon" />
                <h4>Safe, Secure, and Stimulating Environment</h4>
              </div>
              <span className={`wcud-toggle-icon ${expandedSections.environment ? "expanded" : ""}`}>
                {expandedSections.environment ? "−" : "+"}
              </span>
            </div>
            {expandedSections.environment && (
              <div className="wcud-details">
                <p>
                  We prioritize safety with modern features and provide a stimulating atmosphere that encourages exploration, intellectual challenge, and emotional growth.
                </p>
              </div>
            )}
          </div>

          {/* Class Sizes for Personalized Attention */}
          <div className="wcud-detail-item">
            <div className="wcud-heading" onClick={() => toggleSection("classSizes")}>
              <div className="wcud-heading-content">
                <FaUsers className="wcud-icon" />
                <h4>Class Sizes for Personalized Attention</h4>
              </div>
              <span className={`wcud-toggle-icon ${expandedSections.classSizes ? "expanded" : ""}`}>
                {expandedSections.classSizes ? "−" : "+"}
              </span>
            </div>
            {expandedSections.classSizes && (
              <div className="wcud-details">
                <p>
                  Small class sizes ensure tailored instruction, fostering closer student-teacher relationships and maximizing each child’s academic potential.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsDetails;