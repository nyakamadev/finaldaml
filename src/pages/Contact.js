import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaMobileAlt, FaFacebookF, FaWhatsapp, FaClock, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactHero from "../components/heros/ContactHero";
import Footer from "../components/Footer";
import mapImage from "../assets/map.png"; // Placeholder map image
import "../styles/Contact.css";

const LocationPin = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <circle cx="12" cy="12" r="10" stroke="#D97706" strokeWidth="2" fill="white" />
    <circle cx="12" cy="12" r="4" fill="#D97706" />
  </svg>
);

const BranchPopup = ({ branch, onClose }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <motion.div
        className="popup-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="branch-card">
          <div className="map-preview">
            <img src={mapImage} alt={`${branch.name} Map`} />
            <LocationPin />
          </div>
          <h3 className="branch-name">{branch.name}</h3>
          {detailsVisible && (
            <div className="details-container">
              <p className="detail-item"><strong>Address:</strong> {branch.details.address}</p>
              <p className="detail-item"><strong>Phone:</strong> {branch.details.phone}</p>
              <p className="detail-item"><strong>Hours:</strong> <pre>{branch.details.hours}</pre></p>
            </div>
          )}
          <button className="toggle-button" onClick={() => setDetailsVisible(!detailsVisible)}>
            {detailsVisible ? "Hide Details →" : "Show Details →"}
          </button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [popupBranch, setPopupBranch] = useState(null);

  const faqs = [
    { question: "How do I apply for a loan?", answer: "Visit our Loans page, choose your loan type, and fill out the application form online." },
    { question: "What are the eligibility criteria?", answer: "You must be 18+, a Zambian resident, and have a verifiable income source." },
    { question: "How long does approval take?", answer: "Approvals typically take 24-48 hours after submission." },
    { question: "Can I repay early?", answer: "Yes, early repayment is allowed with no penalties." },
  ];

  const branches = [
    {
      name: "Lusaka",
      details: {
        address: "123 Main Street, Lusaka",
        phone: "+260 777518123",
        hours: "Mon-Fri: 08:00 - 17:00\nSat: 09:00 - 13:00",
      },
    },
    {
      name: "Monze",
      details: {
        address: "Monze Room 15, Napsa Building",
        phone: "+260 777518123",
        hours: "Mon-Fri: 08:00 - 17:00\nSat: 09:00 - 13:00",
      },
    },
    {
      name: "Mazabuka",
      details: {
        address: "456 Central Avenue, Mazabuka",
        phone: "+260 777518123",
        hours: "Mon-Fri: 08:00 - 17:00\nSat: 09:00 - 13:00",
      },
    },
    {
      name: "Solwezi",
      details: {
        address: "789 Mining Road, Solwezi",
        phone: "+260 777518123",
        hours: "Mon-Fri: 08:00 - 17:00\nSat: 09:00 - 13:00",
      },
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openPopup = (branch) => {
    setPopupBranch(branch);
  };

  const closePopup = () => {
    setPopupBranch(null);
  };

  return (
    <div className="contact" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <ContactHero />
      <section className="contact-section">
        {/* Contact Card */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="contact-card-container">
          <div className="contact-card">
            <div className="flag-container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/1024px-Flag_of_Zambia.svg.png"
                alt="Zambia Flag"
                className="flag-image"
              />
            </div>
            <h2 className="location-subtitle">Our Branches</h2>
            <h1 className="location-title">Zambia</h1>

            <div className="contact-grid">
              <div className="grid-item">
                <FaEnvelope className="contact-icon" />
                <p className="grid-label">General Enquiries:</p>
                <p className="grid-text">directaccessmoney.co.zm</p>
                <p className="grid-label">Job Enquiries:</p>
                <p className="grid-text">directaccessmoney.co.zm</p>
              </div>

              <div className="grid-item">
                <FaMobileAlt className="contact-icon" />
                <p className="grid-label">Airtel Money:</p>
                <p className="grid-text">Dial *115#</p>
                <p className="grid-text">Whatsapp +260 777518123</p>
              </div>

              <div className="grid-item">
                <FaPhone className="contact-icon" />
                <p className="grid-label">Tel:</p>
                <p className="grid-text">+260 777518123</p>
              </div>

              <div className="grid-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p className="grid-label">Locations:</p>
                {branches.map((branch, index) => (
                  <p key={index} className="grid-text" onClick={() => openPopup(branch)} style={{ cursor: "pointer" }}>
                    {branch.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://wa.me/+260777518123" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="social-icon" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="faq-container">
          <h2 className="faq-title"><FaQuestionCircle /> Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links and Business Hours */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="extra-features">
          <div className="quick-links">
            <h3 className="extra-title">Quick Links</h3>
            <ul>
              <li onClick={() => navigate("/loans")}>Apply for a Loan</li>
              <li onClick={() => navigate("/how-it-works")}>How It Works</li>
              <li onClick={() => navigate("/about")}>About Us</li>
              <li><a href="/doc-1.pdf" target="_blank" rel="noopener noreferrer">Resources</a></li>
            </ul>
          </div>
          <div className="business-hours">
            <h3 className="extra-title"><FaClock /> Business Hours</h3>
            <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
            <p>Sat: 9:00 AM - 1:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </motion.div>

        {/* Branch Popup */}
        {popupBranch && <BranchPopup branch={popupBranch} onClose={closePopup} />}
      </section>
      <Footer />
    </div>
  );
};

export default Contact;