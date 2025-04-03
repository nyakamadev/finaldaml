import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaClock, FaUsers, FaArrowRight, FaExchangeAlt, FaTimes } from "react-icons/fa";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Trends from "../components/Trends";
import ClientCard from "../components/ClientCard";
import NewsSection from "../components/NewsSection";
import TestimonialSlider from "../components/TestimonialSlider";
import "./Home.css";

const Home = () => {
  const [forexRates, setForexRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ZMW");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isForexOpen, setIsForexOpen] = useState(false);

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  useEffect(() => {
    const fetchForexRates = async () => {
      try {
        const apiKey = "19c36a20c0d3a0975a025241";
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/ZMW`);
        if (!response.ok) throw new Error("Failed to fetch forex data");
        const data = await response.json();
        setForexRates(data.conversion_rates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForexRates();
    const interval = setInterval(fetchForexRates, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleConvert = () => {
    if (!forexRates || !amount || isNaN(amount)) {
      setConvertedAmount("Please enter a valid amount");
      return;
    }

    const amountNum = parseFloat(amount);
    let result;

    if (fromCurrency === "ZMW") {
      result = amountNum * (forexRates[toCurrency] || 0);
    } else if (toCurrency === "ZMW") {
      result = amountNum / (forexRates[fromCurrency] || 1);
    } else {
      const zmwValue = amountNum / (forexRates[fromCurrency] || 1);
      result = zmwValue * (forexRates[toCurrency] || 0);
    }

    setConvertedAmount(`${result.toFixed(2)} ${toCurrency}`);
  };

  // Loan Calculator Logic
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal <= 0 || rate < 0 || term <= 0) {
      setMonthlyPayment("Please enter valid values");
      setTotalRepayment(null);
      return;
    }

    // Monthly payment formula: P * [r(1 + r)^n] / [(1 + r)^n - 1]
    const monthly = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const total = monthly * term;

    setMonthlyPayment(monthly.toFixed(2));
    setTotalRepayment(total.toFixed(2));
  };

  const currencies = ["USD", "GBP", "EUR", "ZAR", "ZMW"];
  const features = [
    { icon: <FaMoneyBillWave />, title: "Affordable Loans", description: "Competitive rates and flexible repayment options." },
    { icon: <FaClock />, title: "Fast Approvals", description: "Approvals in as little as 24-48 hours." },
    { icon: <FaUsers />, title: "Trusted Support", description: "Friendly staff across our branches." },
  ];
  const stats = [
    { value: "10K+", label: "Loans Disbursed" },
    { value: "15K+", label: "Happy Clients" },
    { value: "4", label: "Branches" },
    { value: "ZMW 50M+", label: "Amount Lent" },
  ];

  return (
    <div className="home-page">
      <div className="hero-container">
        <Hero
          title={<>Fast. Simple. <span className="highlight">Micro-Loans</span></>}
          description="Access quick funds with Direct Access Money Lending. Fast approvals, flexible terms, and transparent fees for Zambians."
          buttonText={<>Apply Now <FaArrowRight className="button-icon" /></>}
          buttonAction={() => (window.location.href = "/loans")}
        />
        <motion.div
          className={`forex-widget ${isForexOpen ? "open" : ""}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="forex-header" onClick={() => setIsForexOpen(!isForexOpen)}>
            <h3><FaExchangeAlt /> Forex Rates</h3>
            <FaTimes className={`close-icon ${isForexOpen ? "visible" : ""}`} />
          </div>
          {isForexOpen && (
            <div className="forex-content">
              {loading ? (
                <p className="loading-text">Loading forex rates...</p>
              ) : error ? (
                <p className="error-text">Error: {error}. Try later.</p>
              ) : (
                <>
                  <div className="forex-rates">
                    {["USD", "GBP", "EUR", "ZAR"].map((currency) => (
                      <div key={currency} className="rate-card">
                        <FaExchangeAlt className="rate-icon" />
                        <span>1 {currency} = {(1 / forexRates[currency]).toFixed(2)} ZMW</span>
                      </div>
                    ))}
                  </div>
                  <div className="converter-container">
                    <div className="converter-inputs">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="converter-input"
                      />
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="converter-select"
                      >
                        {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                      </select>
                      <span className="converter-arrow">➔</span>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="converter-select"
                      >
                        {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                      </select>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConvert}
                      className="convert-button"
                    >
                      Convert
                    </motion.button>
                    {convertedAmount && <p className="conversion-result">{convertedAmount}</p>}
                  </div>
                  <p className="forex-note">Updated: {new Date().toLocaleTimeString()}</p>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <section className="features-section">
        <motion.div className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2>Why Choose <span className="highlight">Us?</span></h2>
          <div className="title-decoration"></div>
        </motion.div>
        <div className="features-container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Trends />

      <section className="additional-content">
        <motion.div className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2>Loan <span className="highlight">Calculator</span></h2>
          <div className="title-decoration"></div>
        </motion.div>
        <motion.div
          className="loan-calculator"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Loan Amount (ZMW)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="e.g., 5000"
                className="calculator-input"
              />
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g., 15"
                className="calculator-input"
              />
            </div>
            <div className="input-group">
              <label>Loan Term (Months)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="e.g., 12"
                className="calculator-input"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateLoan}
            className="calculate-button"
          >
            Calculate
          </motion.button>
          {monthlyPayment && (
            <div className="calculator-result">
              <p>Monthly Payment: <span>ZMW {monthlyPayment}</span></p>
              {totalRepayment && <p>Total Repayment: <span>ZMW {totalRepayment}</span></p>}
            </div>
          )}
          <p className="calculator-note">Note: This is an estimate. Contact us for exact terms.</p>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="stats-background"></div>
        <motion.div className="stats-content" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="stats-container">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="cta-section">
        <motion.div className="cta-content" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2>Ready to Get <span className="highlight">Started?</span></h2>
          <p>Secure your financial future with a micro-loan from Direct Access Money Lending.</p>
          <div className="cta-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button primary"
              onClick={() => (window.location.href = "/how-it-works")}
            >
              How It Works <FaArrowRight className="button-icon" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button secondary"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>

      <ClientCard />
      <NewsSection />
      <TestimonialSlider />
      <Footer />
    </div>
  );
};

export default Home;