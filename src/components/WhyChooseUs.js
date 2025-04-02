import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const benefits = [
    { title: "No Complicated Paperwork", description: "Apply with minimal hassle and get started quickly." },
    { title: "Funds in 24 Hours", description: "Fast approvals mean you get your money when you need it." },
    { title: "Tailored Loans", description: "Customized options to fit your unique financial needs." },
  ];

  return (
    <section className="why-choose-us" style={{ backgroundColor: "#F3F4F6", padding: "60px 20px", textAlign: "center" }}>
      <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ color: "#1E3A8A" }}>
        Why Choose Us?
      </motion.h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "40px" }}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{ backgroundColor: "#FFFFFF", padding: "20px", border: "2px solid #60A5FA", borderRadius: "8px", width: "250px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 style={{ color: "#1E3A8A" }}>{benefit.title}</h3>
            <p style={{ color: "#6B7280" }}>{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;