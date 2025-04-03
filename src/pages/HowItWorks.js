import React from "react";
import { motion } from "framer-motion";
import HowItWorksHero from "../components/heros/HowItWorksHero"; // Corrected path
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    { stepNumber: 1, title: "Gather Your Documents", description: "Submit your documents online for a quote" },
    { stepNumber: 2, title: "Get Approved", description: "Fast review and approval within hours." },
    { stepNumber: 3, title: "Receive Funds", description: "Money deposited into your account in 24 hours." },
  ];

  return (
    <section className="how-it-works">
      {/* Hero Section */}
      <HowItWorksHero
        title={<>How It <span className="highlight">Works</span></>}
        description="Learn how easy it is to secure a micro-loan with Direct Access Money Lending. Follow these simple steps to get started today!"
        buttonText="Apply Now"
        buttonAction={() => (window.location.href = "/loans")}
      />

      {/* Steps Section */}
      <div className="steps-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-title"
        >
          The <span className="highlight">Process</span>
        </motion.h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <span className="step-number">{step.stepNumber}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;