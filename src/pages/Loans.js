import React, { useState } from "react";
import { motion } from "framer-motion";
import LoansHero from "../components/heros/LoansHero";
import Footer from "../components/Footer";
import "./Loans.css";

// Import images
import personalLoanImg from "../assets/mel.jpg";
import businessLoanImg from "../assets/mel.jpg";
import verificationImg from "../assets/mel.jpg";
import branchLocationImg from "../assets/hg.png";
import moneyTransfer from "../assets/hg.png";
import documentCheck from "../assets/hg.png";

const Loans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanType, setLoanType] = useState("");

  const openModal = (type) => {
    setLoanType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoanType("");
  };

  return (
    <div className="loans-page">
      <LoansHero />
      
      {/* Floating coins decoration */}
      <div className="floating-coins">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="coin"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <section className="loan-intro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="intro-content"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h1>
              Our <span className="highlight">Loan</span> Solutions
            </h1>
            <p>
              We offer tailored financial solutions to help you meet your personal 
              and business needs. Get a quote online and visit a branch for final verification.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="intro-decoration"
          >
            <div className="pulse-dot"></div>
            <div className="pulse-dot delay-1"></div>
            <div className="pulse-dot delay-2"></div>
          </motion.div>
        </motion.div>
      </section>

      <section className="loan-options">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-title"
        >
          <h2>
            Choose Your <span className="highlight">Loan</span> Option
          </h2>
          <div className="title-decoration"></div>
        </motion.div>
        
        <div className="loan-cards">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="loan-card"
          >
            <div className="card-image">
              <img src={personalLoanImg} alt="Personal loan" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-header personal-loan">
              <h3>Personal Microloan</h3>
              <div className="loan-amount">Up to ZMW 50,000</div>
            </div>
            <div className="card-body">
              <ul className="loan-features">
                <li>Flexible repayment terms</li>
                <li>Competitive interest rates</li>
                <li>Quick approval process</li>
              </ul>
              <div className="requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>Formally employed</li>
                  <li>Salary paid into bank account</li>
                  <li>Latest payslip</li>
                  <li>Bank statement</li>
                  <li>Original NRC</li>
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="apply-button"
                onClick={() => openModal("Personal Microloan")}
              >
                Get a Quote
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="loan-card featured"
          >
            <div className="feature-badge">Popular</div>
            <div className="card-image">
              <img src={businessLoanImg} alt="Business loan" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-header business-loan">
              <h3>Business Microloan</h3>
              <div className="loan-amount">Up to ZMW 100,000</div>
            </div>
            <div className="card-body">
              <ul className="loan-features">
                <li>Business growth financing</li>
                <li>Customized repayment plans</li>
                <li>Dedicated account manager</li>
              </ul>
              <div className="requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>Registered business</li>
                  <li>Bank statements (3 months)</li>
                  <li>Original NRC</li>
                  <li>Proof of business address</li>
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="apply-button"
                onClick={() => openModal("Business Microloan")}
              >
                Get a Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="quote-modal-overlay" onClick={closeModal}>
          <motion.div
            className="quote-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <div className="quote-modal-content">
              <h3>Get a {loanType} Quote</h3>
              <p>Fill out the form below to receive a personalized loan quote.</p>
              <form>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" required />
                </div>
                <div className="form-group">
                  <label htmlFor="loanAmount">Requested Loan Amount (ZMW)</label>
                  <input type="number" id="loanAmount" placeholder="e.g., 5000" required />
                </div>
                <div className="form-group">
                  <label htmlFor="payslip">Upload Payslip (PDF)</label>
                  <input type="file" id="payslip" accept=".pdf" required />
                </div>
                <div className="form-group">
                  <label htmlFor="nrc">Upload NRC (PDF)</label>
                  <input type="file" id="nrc" accept=".pdf" required />
                </div>
                <div className="form-group">
                  <label htmlFor="preApprovedLetter">Upload Pre-Approved Letter (PDF, optional)</label>
                  <input type="file" id="preApprovedLetter" accept=".pdf" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="submit-quote"
                  type="submit"
                >
                  Submit Quote Request
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      <section className="verification-process">
        <div className="process-background"></div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="process-content"
        >
          <div className="section-title">
            <h2>
              Simple <span className="highlight">Verification</span> Process
            </h2>
            <div className="title-decoration"></div>
          </div>
          <div className="process-steps">
            <motion.div whileHover={{ y: -10 }} className="step">
              <div className="step-icon">
                <img src={documentCheck} alt="Document check" />
              </div>
              <div className="step-number">1</div>
              <h3>Document Submission</h3>
              <p>Submit your documents online for a quote</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="step">
              <div className="step-icon">
                <img src={verificationImg} alt="Verification" />
              </div>
              <div className="step-number">2</div>
              <h3>Identity Verification</h3>
              <p>Visit a branch for final verification</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="step">
              <div className="step-icon">
                <img src={moneyTransfer} alt="Money transfer" />
              </div>
              <div className="step-number">3</div>
              <h3>Approval & Disbursement</h3>
              <p>Receive approval and funds within 24-48 hours</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="branch-locations">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="location-content"
        >
          <div className="location-text">
            <h2>
              Visit Our <span className="highlight">Branches</span>
            </h2>
            <p>
              We have conveniently located branches in Lusaka, Monze, Mazabuka, and Solwezi. 
              Our friendly staff will guide you through the application process.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="location-button"
            >
              View Branch Locations
            </motion.button>
          </div>
          <div className="location-image">
            <img src={branchLocationImg} alt="Branch location" />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Loans;