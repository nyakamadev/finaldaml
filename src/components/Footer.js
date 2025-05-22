import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const handleNoDocuments = () => {
    alert("Nothing to see here, no documents yet");
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
              <a href="mailto:directaccessmoney.co.zm" className="touch-link">
                GET IN TOUCH
              </a>
            </div>
            <div className="touch-item" onClick={handleNoDocuments}>
              <div className="touch-icon">▶</div>
              <span className="touch-link">Documents and Resources</span>
            </div>
          </div>
        </div>

        {/* Center column */}
        <div className="footer-center">
          <h3>Contact Us</h3>
          <ul className="contact-list">
            <li><strong>Lusaka Office:</strong> +260 773946189</li>
            <li><strong>Monze Office:</strong> +260 771374032</li>
            <li><strong>Mazabuka Office:</strong> +260 777518123</li>
            <li><strong>Direct Access Lumezi:</strong> +260 778517912</li>
            <li><strong>Direct Access Nakonde:</strong> +260 778517914</li>
          </ul>
        </div>

        {/* Right column */}
        <div className="footer-right">
          <div className="social-and-logo">
            <div className="social-icons">
              <a href="https://www.facebook.com/daml09/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/+260777518123" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
            <img className="footer-logo" src={logo} alt="Direct Access Money Lending" />
          </div>

          <div className="credits">
            <p>All Rights Reserved<br />Direct Access Money Lending © 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;