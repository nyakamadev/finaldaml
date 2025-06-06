/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaMoneyBillWave, FaClock, FaUsers, FaArrowRight, FaExchangeAlt, FaTimes, FaInfoCircle } from "react-icons/fa";
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
  const { register, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      loanAmount: "",
      interestRate: "",
      loanTerm: "",
    },
  });
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  // Watch form values for real-time updates
  const loanAmount = watch("loanAmount");
  const interestRate = watch("interestRate");
  const loanTerm = watch("loanTerm");

  // Fetch Forex Rates
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

  // Real-Time Forex Conversion
  useEffect(() => {
    const handleConvert = () => {
      if (!forexRates || !amount || isNaN(amount)) {
        setConvertedAmount(null);
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

    if (amount && fromCurrency && toCurrency) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, forexRates]);

  // Real-Time Loan Calculation
  useEffect(() => {
    const calculateLoan = () => {
      const principal = parseFloat(loanAmount);
      const annualRate = parseFloat(interestRate) / 100;
      const termMonths = parseFloat(loanTerm);

      if (!principal || !annualRate || !termMonths || principal <= 0 || annualRate < 0 || termMonths <= 0) {
        setMonthlyPayment(null);
        setTotalRepayment(null);
        setTotalInterest(null);
        return;
      }

      const totalInterestAmount = principal * annualRate * (termMonths / 12);
      const totalRepaymentAmount = principal + totalInterestAmount;
      const monthlyPaymentAmount = totalRepaymentAmount / termMonths;

      setMonthlyPayment(monthlyPaymentAmount.toFixed(2));
      setTotalRepayment(totalRepaymentAmount.toFixed(2));
      setTotalInterest(totalInterestAmount.toFixed(2));
    };

    if (loanAmount && interestRate && loanTerm) {
      calculateLoan();
    }
  }, [loanAmount, interestRate, loanTerm]);

  const currencies = ["USD", "GBP", "EUR", "ZAR", "ZMW"];
  const features = [
    { icon: <FaMoneyBillWave />, title: "Affordable Loans", description: "Competitive rates and flexible repayment options." },
    { icon: <FaClock />, title: "Fast Approvals", description: "Approvals in as little as 24-48 hours." },
    { icon: <FaUsers />, title: "Trusted Support", description: "Friendly staff across our branches." },
  ];
  const stats = [
    { value: "20k+", label: "Loans Disbursed" },
    { value: "10K+", label: "Happy Clients" },
    { value: "6", label: "Branches" },
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
                    <h4>Current Rates (vs ZMW)</h4>
                    {["USD", "GBP", "EUR", "ZAR"].map((currency) => (
                      <div key={currency} className="rate-card">
                        <FaExchangeAlt className="rate-icon" />
                        <span>1 {currency} = {(1 / forexRates[currency]).toFixed(2)} ZMW</span>
                      </div>
                    ))}
                  </div>
                  <div className="converter-container">
                    <h4>Convert Currency</h4>
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
                      <button
                        className="swap-button"
                        onClick={() => {
                          const temp = fromCurrency;
                          setFromCurrency(toCurrency);
                          setToCurrency(temp);
                        }}
                      >
                        ⇄
                      </button>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="converter-select"
                      >
                        {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
                      </select>
                    </div>
                    {convertedAmount && (
                      <motion.p
                        className="conversion-result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {convertedAmount}
                      </motion.p>
                    )}
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
          <h2>Flat Rate Loan <span className="highlight">Calculator</span></h2>
          <div className="title-decoration"></div>
        </motion.div>
        <motion.div
          className="loan-calculator"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="calculator-intro">
            Estimate your loan repayments with our <strong>flat interest rate</strong> calculator.
          </p>
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Loan Amount (ZMW)</label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={loanAmount || 1000}
                onChange={(e) => setValue("loanAmount", e.target.value)}
                className="calculator-slider"
              />
              <input
                type="number"
                {...register("loanAmount", { required: true, min: 1000, max: 100000 })}
                placeholder="e.g., 5000"
                className="calculator-input"
              />
              {errors.loanAmount && <span className="error-text">Enter a value between 1,000 and 100,000</span>}
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={interestRate || 5}
                onChange={(e) => setValue("interestRate", e.target.value)}
                className="calculator-slider"
              />
              <input
                type="number"
                {...register("interestRate", { required: true, min: 5, max: 30 })}
                placeholder="e.g., 15"
                className="calculator-input"
              />
              {errors.interestRate && <span className="error-text">Enter a value between 5 and 30</span>}
            </div>
            <div className="input-group">
              <label>Loan Term (Months)</label>
              <input
                type="range"
                min="3"
                max="60"
                step="1"
                value={loanTerm || 3}
                onChange={(e) => setValue("loanTerm", e.target.value)}
                className="calculator-slider"
              />
              <input
                type="number"
                {...register("loanTerm", { required: true, min: 3, max: 60 })}
                placeholder="e.g., 12"
                className="calculator-input"
              />
              {errors.loanTerm && <span className="error-text">Enter a value between 3 and 60</span>}
            </div>
          </div>
          {monthlyPayment && (
            <motion.div
              className="calculator-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="result-row">
                <span>Monthly Payment:</span>
                <span className="result-value">ZMW {monthlyPayment}</span>
              </div>
              <div className="result-row">
                <span>Total Interest:</span>
                <span className="result-value">ZMW {totalInterest}</span>
              </div>
              <div className="result-row">
                <span>Total Repayment:</span>
                <span className="result-value">ZMW {totalRepayment}</span>
              </div>
              <p className="result-note">Based on flat rate interest. Additional fees may apply.</p>
            </motion.div>
          )}
          <p className="calculator-note">
            Need a custom loan plan? <a href="/contact" className="contact-link">Contact us</a> for personalized assistance.
          </p>
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