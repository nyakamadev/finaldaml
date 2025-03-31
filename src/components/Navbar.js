import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Overview", path: "/" },
    { label: "Business Solution", path: "/business-solution" },
    { label: "Blog", path: "/blog" },
    { label: "FAQ", path: "/faq" },
    { label: "Admin", path: "/admin" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div 
          className="navbar-brand" 
          onClick={() => navigate("/")}
          aria-label="Home"
          role="button"
          tabIndex={0}
        >
          <span className="brand-text">Suesland Academy</span>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <div className="desktop-nav">
          <ul className="navbar-menu">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={pathname === item.path ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="navbar-buttons">
            <button className="btn">Sign In</button>
            <button className="btn primary">Manage Now</button>
          </div>
        </div>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <ul className="mobile-menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={pathname === item.path ? "active" : ""}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className="mobile-buttons">
          <button className="btn">Sign In</button>
          <button className="btn primary">Manage Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;