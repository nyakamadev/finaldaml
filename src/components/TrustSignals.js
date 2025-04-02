import React from "react";
import { motion } from "framer-motion";

const TrustSignals = () => {
  const testimonials = [
    { quote: "Saved my business with a quick loan!", author: "John K." },
    { quote: "Easiest loan process I’ve ever experienced.", author: "Sarah M." },
  ];

  return (
    <section className="trust-signals" style={{ backgroundColor: "#F3F4F6", padding: "60px 20px", textAlign: "center" }}>
      <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ color: "#1E3A8A" }}>
        Trusted by Our Customers
      </motion.h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "40px" }}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "8px", width: "250px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <p style={{ color: "#6B7280" }}>"{testimonial.quote}"</p>
            <p style={{ color: "#1E3A8A", fontWeight: "bold", marginTop: "10px" }}>– {testimonial.author}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} style={{ marginTop: "40px" }}>
        <p style={{ color: "#D97706", fontSize: "18px" }}>Secure & Trusted by Thousands</p>
      </motion.div>
    </section>
  );
};

export default TrustSignals;