import React from "react";
import { FaEye, FaRocket, FaHeart } from "react-icons/fa"; // Icons for Vision, Mission, and Values
import "./VisionMissionValues.css";

const VisionMissionValues = () => {
  return (
    <section className="vision-mission-values">
      <div className="vmv-header">
        <h2>Our Vision, Mission, and Values</h2>
        <p>
          At our core, we are committed to creating meaningful impact through our
          values, our aspirations, and our dedication to nurture young minds.
        </p>
      </div>
      <div className="vmv-cards">
        <div className="vmv-card">
          <div className="vmv-icon vision">
            <FaEye />
          </div>
          <h3>Vision</h3>
          <p>
            To create a strong foundation where children are equipped with the
            skills, values, and confidence needed to thrive in an ever-changing
            world.
          </p>
        </div>
        <div className="vmv-card">
          <div className="vmv-icon mission">
            <FaRocket />
          </div>
          <h3>Mission</h3>
          <p>
            At Suesland Academy, our mission is to empower every student through a
            transformative education that champions academic excellence, nurtures
            all aspects of personal growth, and embraces the richness of diversity.
          </p>
        </div>
        <div className="vmv-card">
          <div className="vmv-icon values">
            <FaHeart />
          </div>
          <h3>Values</h3>
          <p>
            We believe in setting high academic standards and providing a rigorous
            yet supportive learning experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionValues;