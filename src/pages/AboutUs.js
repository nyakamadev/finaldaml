import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import AboutUsHero from "../components/heros/AboutUsHero";
import "./AboutUs.css";

// Import images
import teamMeeting from "../assets/mg3.jpg";
import happyClients from "../assets/mel.jpg";
import zambiaMap from "../assets/map.png";
import financialGrowth from "../assets/daml.jpg";

const AboutUs = () => {
  return (
    <div className="about-us">
      <AboutUsHero 
        title="Empowering Zambia's Financial Future"
        subtitle="Trusted microfinance solutions since 2019"
        ctaText="Apply for a Loan Today"
      />

      {/* Our Story Section */}
      <section className="about-content">
        <div className="content-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="content-text"
          >
            <h2>Our Humble Beginnings</h2>
            <p>
              Founded in 2019 in Monze, Direct Access Money Lending started as 
              a small microfinance initiative with a big vision. Our founders 
              recognized the need for accessible financial services that could 
              empower local communities and stimulate economic growth.
            </p>
            <p>
              What began as a single office has now grown into a network serving 
              multiple regions across Zambia, including Mazabuka, Lusaka, and Solwezi.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="content-image"
          >
            <img src={teamMeeting} alt="Our team discussing financial solutions" />
          </motion.div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="stats-banner"
        >
          <div className="stat-item">
            <h3>5+</h3>
            <p>Years in Operation</p>
          </div>
          <div className="stat-item">
            <h3>4</h3>
            <p>Regions Served</p>
          </div>
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Clients Empowered</p>
          </div>
          <div className="stat-item">
            <h3>ZMW 50M+</h3>
            <p>Loans Disbursed</p>
          </div>
        </motion.div>

        {/* Our Mission Section */}
        <div className="mission-section">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mission-card"
          >
            <h2>Our Mission</h2>
            <p>
              To provide accessible, transparent, and responsible financial 
              services that empower individuals and businesses to achieve 
              their goals and contribute to Zambia's economic growth.
            </p>
          </motion.div>
        </div>

        {/* What We Do Section */}
        <div className="content-grid reverse">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="content-text"
          >
            <h2>Tailored Financial Solutions</h2>
            <p>
              We specialize in providing fast, simple, and affordable credit 
              solutions tailored specifically for formally employed individuals 
              and private sector employees across Zambia.
            </p>
            <ul className="services-list">
              <li>Personal loans with competitive rates</li>
              <li>Emergency cash advances</li>
              <li>Salary-backed loans</li>
              <li>Business micro-loans</li>
              <li>Financial literacy programs</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="content-image"
          >
            <img src={financialGrowth} alt="Financial growth chart" />
          </motion.div>
        </div>

        {/* Coverage Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="map-section"
        >
          <h2>Our Presence Across Zambia</h2>
          <div className="map-container">
            <img src={zambiaMap} alt="Zambia map showing our locations" />
            <div className="location-marker lusaka">Lusaka</div>
            <div className="location-marker monze">Monze</div>
            <div className="location-marker mazabuka">Mazabuka</div>
            <div className="location-marker solwezi">Solwezi</div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="team-section"
        >
          <h2>Meet Our Team</h2>
          <p className="team-description">
            Our dedicated team of financial experts is committed to providing 
            personalized service and building lasting relationships with our clients.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="outline-button"
          >
            Contact Our Team
          </motion.button>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="testimonial-section"
        >
          <div className="testimonial-card">
            <img src={happyClients} alt="Satisfied client" />
            <div className="testimonial-content">
              <blockquote>
                "Direct Access Money Lending helped me expand my small business 
                when no traditional bank would. Their process was simple and 
                their staff treated me with respect."
              </blockquote>
              <p className="client-name">- Sarah M., Lusaka</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;