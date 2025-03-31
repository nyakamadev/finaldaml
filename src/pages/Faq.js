import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "where are you Located?",
      answer: "we in Woodlands Extention at plot number das dash dash.",
    },
    {
      question: "How much are your school fees ?",
      answer: "baby classs .......",
    },
    {
      question: " what is the assesment criteria?",
      answer: "jhdgdsg dgjds dg.",
    },
  ];

  return (
    <div className="faq-page">
      {/* Heading Section */}
      <section className="faq-header">
        <h1>Your Daily questions, <span className="faq-highlight">answered</span></h1>
        <h2>Suesland Academ FAQs</h2>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              {faq.question}
              <span className="faq-icon">
                {expandedIndex === index ? "−" : "+"}
              </span>
            </div>
            {expandedIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </section>

      {/* Join the Conversation Section */}
      <section className="faq-join-conversation">
        <h2>Join the conversation</h2>
        <div className="join-cards">
          <div className="join-card">
            <h3>Get help.</h3>
            <p>
              Troubleshoot querries , here is a faster way 
            </p>
            <a href="https://wa.me/260972276257" className="join-link">
              →
            </a>
          </div>
          <div className="join-card">
            <h3>Join our community.</h3>
            <p>
              Connect with and learn from other people with who are working with us at the academy.
            </p>
            <a href="https://wa.me/260972276257" className="join-link">
              →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
