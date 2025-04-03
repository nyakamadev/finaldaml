import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiUserCheck, FiDollarSign } from "react-icons/fi";
import HowItWorksHero from "../components/heros/HowItWorksHero";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <HowItWorksHero
        title={<>How It <span className="highlight">Works</span></>}
        description="Learn how easy it is to secure a micro-loan with Direct Access Money Lending"
        buttonText="Apply Now"
        buttonAction={() => (window.location.href = "/loans")}
      />

      {/* Process Section */}
      <section className="process-section">
        <div className="process-background"></div>
        <div className="process-content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2><span className="white-text">Simple</span> <span className="orange-text">3-Step</span> Process</h2>
            <p className="white-text">Get funded quickly with our streamlined application</p>
            <div className="header-decoration light"></div>
          </motion.div>
          
          <div className="process-steps">
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">1</div>
              <div className="step-icon">
                <FiFileText size={32} />
              </div>
              <h3>Submit Application</h3>
              <p>Complete our online form in minutes with basic information</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">2</div>
              <div className="step-icon">
                <FiUserCheck size={32} />
              </div>
              <h3>Verification</h3>
              <p>Visit any branch with your documents for quick verification</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">3</div>
              <div className="step-icon">
                <FiDollarSign size={32} />
              </div>
              <h3>Receive Funds</h3>
              <p>Get money disbursed to your account within 24-48 hours</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collateral Free Section */}
      <section className="collateral-section">
        <div className="collateral-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="collateral-card"
          >
            <h3>Collateral-Free Loans Available</h3>
            <p>We offer special loan options with no collateral required for:</p>
            <ul>
              <li>Civil servants</li>
              <li>Clients with an MOU with us</li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us to Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;