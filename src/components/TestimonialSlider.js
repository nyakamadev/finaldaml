import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import "./TestimonialSlider.css";

const TestimonialSlider = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "Suesland Academy has been a blessing for our family. The Christian values and nurturing environment have helped my child grow both academically and spiritually.",
      name: "Sarah Johnson",
      role: "Parent",
    },
    {
      id: 2,
      quote:
        "I love the small class sizes at Suesland Academy! The teachers truly care about each student and provide personalized attention that has helped me excel.",
      name: "Michael Chen",
      role: "Student",
    },
    {
      id: 3,
      quote:
        "Teaching at Suesland Academy is a joy. The supportive community and shared commitment to faith and education make it a wonderful place to work.",
      name: "Emily Davis",
      role: "Teacher",
    },
  ];

  // State to track the current testimonial index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get the current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonial-slider">
      <h2 className="ts-heading">What Our Community Says</h2>
      <div className="ts-container">
        {/* Navigation Arrow - Left */}
        <button className="ts-nav-button ts-nav-left" onClick={prevTestimonial}>
          <FaArrowLeft />
        </button>

        {/* Testimonial Content */}
        <div className="ts-content">
          <FaQuoteLeft className="ts-quote-icon" />
          <p className="ts-quote">{currentTestimonial.quote}</p>
          <h3 className="ts-name">{currentTestimonial.name}</h3>
          <p className="ts-role">{currentTestimonial.role}</p>
        </div>

        {/* Navigation Arrow - Right */}
        <button className="ts-nav-button ts-nav-right" onClick={nextTestimonial}>
          <FaArrowRight />
        </button>
      </div>

      {/* Dots for Navigation */}
      <div className="ts-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`ts-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSlider;