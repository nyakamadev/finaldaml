import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import logo from "../logo.png"; // Import the logo from src/logo.png
import "./Footer.css";

const Footer = () => {
  // Get navigate from react-router
  const navigate = useNavigate();

  // Handler for "GET IN TOUCH"
  const goToFAQ = () => {
    navigate("/faq");
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Left column */}
        <div className="footer-left">
          <p className="enroll-text">Enroll your child now</p>
          <div className="green-line" />
          <h1 className="academy-title">Suesland Academy</h1>

          <div className="get-in-touch">
            <h3>How to get in touch</h3>

            {/* Clickable "GET IN TOUCH" item */}
            <div className="touch-item" onClick={goToFAQ}>
              <div className="touch-icon">✉</div>
              <span>GET IN TOUCH</span>
            </div>

            <div className="touch-item">
              <div className="touch-icon">▶</div>
              <a
                href="/doc-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-link"
              >
                Documents and Resources
              </a>
            </div>
          </div>
        </div>

        {/* Center column */}
        <div className="footer-center">
          <p>
            Plot No. 12298 <br />
            Puta Street, Woodlands Extension <br />
            Call: +260973974224
          </p>
        </div>

        {/* Right column */}
        <div className="footer-right">
          <div className="social-and-logo">
            <div className="social-icons">
              <FaFacebookF />
              <FaWhatsapp />
            </div>
            <img className="footer-logo" src={logo} alt="Suesland Academy" /> {/* Use the imported logo */}
          </div>

          <div className="credits">
            <span>Full Stack by Mpange Creative Arts (c) 2025</span>
            <span>Mpange Inshi Lelo? 0972276257</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;