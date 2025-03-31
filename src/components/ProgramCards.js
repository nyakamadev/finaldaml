import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add useNavigate
import { FaSmile, FaChild, FaGraduationCap, FaBook, FaTimes } from "react-icons/fa";
import "./ProgramCards.css";

const ProgramCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const cards = [
    {
      title: "Daycare",
      description: "Engaging and caring environment for the little ones.",
      icon: <FaSmile />,
      subtitle: "A nurturing space for your little ones to grow and thrive.",
      outline: [
        "Safe and nurturing environment for children aged 1-3.",
        "Daily activities including storytime, music, and outdoor play.",
        "Focus on social skills, motor development, and early learning.",
        "Nutritious meals and nap times included.",
      ],
    },
    {
      title: "Baby Class",
      description: "Introduction to learning through play and creativity.",
      icon: <FaChild />,
      subtitle: "First steps in learning through play and creativity.",
      outline: [
        "For children aged 3-4, introducing basic learning concepts.",
        "Play-based learning with arts, crafts, and sensory activities.",
        "Development of language, numbers, and social interaction.",
        "Structured daily routine to prepare for pre-school.",
      ],
    },
    {
      title: "Pre-School",
      description: "Building confidence and skills for future schooling.",
      icon: <FaGraduationCap />,
      subtitle: "Building a strong foundation for future schooling.",
      outline: [
        "For children aged 4-5, preparing for formal schooling.",
        "Curriculum includes early literacy, numeracy, and science.",
        "Emphasis on independence, confidence, and teamwork.",
        "Regular assessments and parent-teacher meetings.",
      ],
    },
    {
      title: "Grade 1-4",
      description: "Focus on academic excellence and critical thinking.",
      icon: <FaBook />,
      subtitle: "Fostering academic excellence and critical thinking.",
      outline: [
        "For children aged 6-10, focusing on core academics.",
        "Subjects: Math, English, Science, Social Studies, and Arts.",
        "Critical thinking and problem-solving through projects.",
        "Extracurricular activities like sports and music.",
      ],
    },
  ];

  const openModal = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  const handleEnroll = () => {
    // Navigate to the enroll page with the selected program as a query parameter
    navigate(`/enroll?program=${encodeURIComponent(selectedProgram.title)}`);
    closeModal();
  };

  return (
    <>
      <section className="program-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => openModal(card)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedProgram.title}</h2>
              <p className="modal-subtitle">{selectedProgram.subtitle}</p>
              <button className="modal-close-icon" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <h3>Course Outline</h3>
              <ul>
                {selectedProgram.outline.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="modal-actions">
              <button onClick={handleEnroll} className="enroll-btn">
                Enroll Now
              </button>
              <button onClick={closeModal} className="modal-close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramCards;