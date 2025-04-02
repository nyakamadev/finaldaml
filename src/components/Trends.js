import React from "react";
import { motion } from "framer-motion";
import "./Trends.css";
import damlImage from "../assets/daml.jpg";

const Trends = () => {
  const partnerships = [
    { text: "Memorandum of Understanding with Bank of Zambia", id: 1 },
    { text: "Official partner of Zambia National Chamber of Commerce", id: 2 },
    { text: "Collaboration with Ministry of Small Business Development", id: 3 },
    { text: "Strategic alliance with Zambia Association of Microfinance Institutions", id: 4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="trends-section">
      <div className="trends-container">
        <div className="trends-image-grid">
          <div className="image-wrapper">
            <img src={damlImage} alt="Strategic Partnerships" className="trends-image" />
            <div className="image-overlay"></div>
          </div>
          
          <motion.div 
            className="trends-content"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="trends-title">Our Strategic Partnerships</h2>
            <motion.ul className="partnerships-list">
              {partnerships.map((partner) => (
                <motion.li
                  key={partner.id}
                  className="partnership-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="check-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10.5L8.5 15L16 5"
                        stroke="#D97706"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {partner.text}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Trends;