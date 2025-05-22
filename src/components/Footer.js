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
          <p><strong>Lusaka Office:</strong> +260 773946189</p>
          <p><strong>Monze Office:</strong> +260 771374032</p>
          <p><strong>Mazabuka Office:</strong> +260 777518123</p>
          <p><strong>Direct Access Lumezi:</strong> +260 778517912</p>
          <p><strong>Direct Access Nakonde:</strong> +260 778517914</p>
        </div>

        {/* Right column */}
        <div className="footer-right">
          <div className="social-and-logo">
            <div className="social-icons">
              <FaFacebookF />
              <FaWhatsapp />
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
