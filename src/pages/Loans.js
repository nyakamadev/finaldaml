/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import LoansHero from "../components/heros/LoansHero";
import Footer from "../components/Footer";
import "./Loans.css";

// Icons
import { FiCheck, FiX, FiUpload, FiSend, FiDollarSign, FiBriefcase, FiFileText, FiUserCheck, FiCreditCard, FiClock, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

// Images - You'll need to replace these with your actual images
import personalLoanImage from "../assets/personal-loan.jpg";
import businessLoanImage from "../assets/business-loan.jpg";
import branchImage from "../assets/branch-location.jpg";

const Loans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanType, setLoanType] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  const openModal = (type) => {
    setLoanType(type);
    setIsModalOpen(true);
    setActiveStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoanType("");
  };

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 1));

  // Branch data
  const branches = [
    {
      name: "Lusaka Main Branch",
      location: "Cairo Road, Lusaka City Center",
      phone: "+260 211 123456",
      email: "lusaka@yourfinance.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM",
      image: branchImage
    },
    {
      name: "Mazabuka Branch",
      location: "Independence Avenue, Mazabuka Town Center",
      phone: "+260 213 456789",
      email: "mazabuka@yourfinance.com",
      hours: "Mon-Fri: 8:30 AM - 4:30 PM\nSat: 9:00 AM - 12:00 PM",
      image: branchImage
    },
    {
      name: "Monze Branch",
      location: "Main Street, Monze Central Business District",
      phone: "+260 214 789012",
      email: "monze@yourfinance.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM\nSat: Closed",
      image: branchImage
    },
    {
      name: "Solwezi Branch",
      location: "Kansenshi Road, Solwezi Town Center",
      phone: "+260 218 345678",
      email: "solwezi@yourfinance.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM",
      image: branchImage
    }
  ];

  return (
    <div className="loans-page">
      <LoansHero />
      
      {/* Animated floating elements */}
      <div className="floating-elements">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              x: Math.random() * 100 - 50,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {i % 2 === 0 ? <FiDollarSign /> : <FiCreditCard />}
          </motion.div>
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
          <div className="intro-text">
            <motion.h1
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Tailored <span className="highlight">Financial Solutions</span> For You
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Whether for personal needs or business growth, our flexible loan options 
              come with competitive rates and a streamlined approval process.
            </motion.p>
          </div>
          
          <div className="intro-graphic">
            <div className="graphic-circle primary"></div>
            <div className="graphic-circle secondary"></div>
            <div className="graphic-icon">
              <FiDollarSign size={48} />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="loan-options">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Our <span className="highlight">Loan Products</span></h2>
          <p>Choose the option that best fits your financial needs</p>
          <div className="header-decoration"></div>
        </motion.div>
        
        <div className="loan-grid">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="loan-card personal"
          >
            <div className="card-image">
              <img src={personalLoanImage} alt="Personal loan" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-badge">
              <FiUserCheck size={20} />
            </div>
            <div className="card-content">
              <h3>Personal Loan</h3>
              <div className="loan-amount">Up to ZMW 50,000</div>
              
              <ul className="loan-features">
                <li><FiCheck /> Flexible repayment terms</li>
                <li><FiCheck /> Competitive interest rates</li>
                <li><FiCheck /> Quick approval process</li>
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="apply-button"
                onClick={() => openModal("Personal Loan")}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="loan-card business featured"
          >
            <div className="card-image">
              <img src={businessLoanImage} alt="Business loan" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-badge popular">
              <span>Most Popular</span>
            </div>
            <div className="card-content">
              <h3>Business Loan</h3>
              <div className="loan-amount">Up to ZMW 100,000</div>
              
              <ul className="loan-features">
                <li><FiCheck /> Business growth financing</li>
                <li><FiCheck /> Custom repayment plans</li>
                <li><FiCheck /> Dedicated account manager</li>
              </ul>
              
              <div className="requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>Registered business</li>
                  <li>3 months bank statements</li>
                  <li>Original NRC</li>
                  <li>Proof of business address</li>
                </ul>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="apply-button"
                onClick={() => openModal("Business Loan")}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <motion.div 
            className="modal-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              <FiX size={24} />
            </button>
            
            <div className="modal-header">
              <h3>Apply for {loanType}</h3>
              <div className="progress-steps">
                <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>3</div>
              </div>
            </div>
            
            <div className="modal-content">
              {activeStep === 1 && (
                <div className="form-step">
                  <h4>Personal Information</h4>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your full name" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+260 97 000 0000" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Loan Amount (ZMW)</label>
                    <input type="number" placeholder="Enter desired amount" />
                  </div>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="form-step">
                  <h4>Document Upload</h4>
                  <div className="upload-area">
                    <FiUpload size={48} />
                    <p>Drag & drop files here or click to browse</p>
                    <small>Supports PDF, JPG, PNG (Max 5MB each)</small>
                    <input type="file" multiple style={{ display: 'none' }} />
                  </div>
                  <div className="document-list">
                    <div className="document-item">
                      <FiFileText />
                      <span>Payslip.pdf</span>
                      <span className="status">Uploaded</span>
                    </div>
                    <div className="document-item required">
                      <FiFileText />
                      <span>NRC Document</span>
                      <span className="status">Pending</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeStep === 3 && (
                <div className="form-step">
                  <div className="success-icon">
                    <div className="checkmark">✓</div>
                  </div>
                  <h4>Application Submitted!</h4>
                  <p className="success-message">
                    Thank you for your application. We've received your information 
                    and will contact you within 24 hours to complete the process.
                  </p>
                  <div className="next-steps">
                    <h5>Next Steps:</h5>
                    <ul>
                      <li>Verification call from our team</li>
                      <li>Document verification at branch</li>
                      <li>Approval notification</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              {activeStep > 1 && activeStep < 3 && (
                <button className="secondary-button" onClick={prevStep}>
                  Back
                </button>
              )}
              {activeStep < 3 ? (
                <button className="primary-button" onClick={nextStep}>
                  {activeStep === 2 ? 'Submit Application' : 'Continue'}
                </button>
              ) : (
                <button className="primary-button" onClick={closeModal}>
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <section className="process-section">
        <div className="process-background"></div>
        <div className="process-content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2><span className="white-text">Simple</span> <span className="orange-text">3-Step</span> Process</h2>
            <p className="white-text">Get funded quickly with our streamlined application</p>
            <div className="header-decoration light"></div>
          </motion.div>
          
          <div className="process-steps">
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">1</div>
              <div className="step-icon">
                <FiFileText size={32} />
              </div>
              <h3>Submit Application</h3>
              <p>Complete our online form in minutes with basic information</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">2</div>
              <div className="step-icon">
                <FiUserCheck size={32} />
              </div>
              <h3>Verification</h3>
              <p>Visit any branch with your documents for quick verification</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="process-step"
            >
              <div className="step-number">3</div>
              <div className="step-icon">
                <FiDollarSign size={32} />
              </div>
              <h3>Receive Funds</h3>
              <p>Get money disbursed to your account within 24-48 hours</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="locations-content"
        >
          <div className="locations-text">
            <h2>Our <span className="highlight">Branch Network</span></h2>
            <p>
              With locations across Zambia, our friendly staff are ready to assist you 
              with your loan application and financial needs.
            </p>
          </div>
          
          <div className="branches-grid">
            {branches.map((branch, index) => (
              <div key={index} className="branch-card">
                <div className="branch-image">
                  <img src={branch.image} alt={branch.name} />
                </div>
                <div className="branch-details">
                  <h3>{branch.name}</h3>
                  <div className="branch-info">
                    <div className="info-item">
                      <FiMapPin className="info-icon" />
                      <span>{branch.location}</span>
                    </div>
                    <div className="info-item">
                      <FiPhone className="info-icon" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="info-item">
                      <FiMail className="info-icon" />
                      <span>{branch.email}</span>
                    </div>
                    <div className="info-item">
                      <FiClock className="info-icon" />
                      <span style={{ whiteSpace: 'pre-line' }}>{branch.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Loans;