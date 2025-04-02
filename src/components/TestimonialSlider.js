import React, { useState } from "react";
import { motion } from "framer-motion"; // Adding motion for smooth animations
import placeholder1 from "../assets/mel.jpg"; // Replace with your images
import placeholder2 from "../assets/mel.jpg";
import placeholder3 from "../assets/mel.jpg";
import placeholder4 from "../assets/mel.jpg";
import "./TestimonialSlider.css";

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      image: placeholder1,
      quote: `"The loan process was seamless and quick. It helped me expand my small business in no time!"`,
      author: "Chileshe Mwamba",
      location: "Lusaka, Zambia",
    },
    {
      image: placeholder2,
      quote: `"Thanks to Direct Access, I could afford new equipment and double my productivity!"`,
      author: "Mutinta Chanda",
      location: "Monze, Zambia",
    },
    {
      image: placeholder3,
      quote: `"Their support team is amazing. I got approved in 24 hours and started my project right away."`,
      author: "Joseph Phiri",
      location: "Mazabuka, Zambia",
    },
    {
      image: placeholder4,
      quote: `"The flexible terms saved my business during tough times. Highly recommend!"`,
      author: "Grace Banda",
      location: "Solwezi, Zambia",
    },
  ];

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <motion.div
          className="testimonial-slider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${(activeIndex * 100) / testimonials.length}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-item">
                <div className="testimonial-image-container">
                  <img
                    src={testimonial.image}
                    alt={`Testimonial from ${testimonial.author}`}
                    className="testimonial-image"
                  />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div className="testimonial-author-container">
                    <h3 className="testimonial-author">{testimonial.author}</h3>
                    <p className="testimonial-location">{testimonial.location}</p>
                  </div>
                  <motion.button
                    className="testimonial-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Story
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;