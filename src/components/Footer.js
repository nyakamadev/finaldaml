import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Left column */}
        <div className="footer-left">
          <p className="enroll-text">GET IN TOUCH</p>
          <div className="yellow-line" />
          <h1 className="company-title">Direct Access Money Lending</h1>

          <div className="get-in-touch">
            <h3>How to get in touch</h3>
            <div className="touch-item" onClick={goToContact}>
              <div className="touch-icon">✉</div>
              <span>GET IN TOUCH</span>
            </div>
            <div className="touch-item">
              <div className="touch-icon">▶</div>
              <a href="/doc-1.pdf" target="_blank" rel="noopener noreferrer" className="touch-link">
                Documents and Resources
              </a>
            </div>
          </div>
        </div>

        {/* Center column */}
        <div className="footer-center">
          <p>
          room 4 Napsa Building Monze <br />
          Call: +260 777518123  <br />

          </p>
        </div>

        {/* Right column */}
        <div className="footer-right">
          <div className="social-and-logo">
            <div className="social-icons">
              <FaFacebookF />
              <FaWhatsapp />
            </div>
            <img className="footer-logo" src="/logo.png" alt="Direct Access Money Lending" />
            <button className="manage-button" onClick={goToAdmin}>
              Manage
            </button>
          </div>

          <div className="credits">
            <p>Website by Chanda Mwika <br /> Mpange Creative Arts © 2025</p>
            <p>Mpangenshi? Call +26 0972276257</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;