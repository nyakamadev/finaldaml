import React, { useState } from "react";
import Footer from "../components/Footer"; // Import the Footer component
import "./BusinessSolution.css";

// Import Images
import img1 from "../assets/BS/1 (1).png";
import img2 from "../assets/BS/1 (2).png";
import img3 from "../assets/BS/1 (3).png";
import img4 from "../assets/BS/1 (4).png";
import img5 from "../assets/BS/1 (5).png";
import img6 from "../assets/BS/1 (6).png";
import img7 from "../assets/BS/1 (7).png";
import img8 from "../assets/BS/1 (8).png";
import img9 from "../assets/BS/1 (9).png";
import img10 from "../assets/BS/1 (10).png";
import img11 from "../assets/BS/1 (11).png";
import img12 from "../assets/BS/1 (12).png";
import img13 from "../assets/BS/1 (13).png";
import img14 from "../assets/BS/1 (14).png";

const BusinessSolution = () => {
  const [items] = useState([
    { id: 1, name: "SCHOOL SPORTS KIT", image: img1 },
    { id: 2, name: "SCHOOL NECK TIES", image: img2 },
    { id: 3, name: "TRACKSUIT - TOP & BOTTOM", image: img3 },
    { id: 4, name: "SCHOOL TROUSER", image: img4 },
    { id: 5, name: "CUSTOM SHIRT", image: img5 },
    { id: 6, name: "CUSTOM JERSEY", image: img6 },
    { id: 7, name: "BALL TIE", image: img7 },
    { id: 8, name: "BLAZER", image: img8 },
    { id: 9, name: "CUSTOM DRINKING BOTTLES", image: img9 },
    { id: 10, name: "DRAWSTRING BAG", image: img10 },
    { id: 11, name: "GYM DRESS", image: img11 },
    { id: 12, name: "SHIRTS", image: img12 },
    { id: 13, name: "SHORTS", image: img13 },
    { id: 14, name: "SCHOOL STOCKINGS", image: img14 },
  ]);

  // State for handling full image preview
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open full image preview
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to close the image modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Function to open WhatsApp chat
  const handleConsult = (itemName) => {
    const phoneNumber = "260972276257"; // WhatsApp number (without +)
    const message = `Hello, I'm interested in "${itemName}". Can I get more details?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank"); // Opens WhatsApp in a new tab
  };

  return (
    <div className="business-solution-page">
      <div className="business-container">
        <h2 className="business-title">📚 School Store - Items for Sale</h2>

        {/* Items Grid */}
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
                onClick={() => handleImageClick(item.image)} // Click to open full image
              />
              <h3 className="item-name">{item.name}</h3>
              <button className="consult-btn" onClick={() => handleConsult(item.name)}>
                Consult 💬
              </button>
            </div>
          ))}
        </div>

        {/* Full Image Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>×</span>
              <img src={selectedImage} alt="Full View" className="full-image" />
            </div>
          </div>
        )}
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default BusinessSolution;