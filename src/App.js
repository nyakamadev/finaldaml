import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Loans from "./pages/Loans";

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar here so it appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
    </Router>
  );
}

export default App;