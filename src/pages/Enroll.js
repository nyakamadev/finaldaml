import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Enroll.css";

const Enroll = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefilledProgram = queryParams.get("program") || "";

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    email: "",
    phone: "",
    program: prefilledProgram,
    residentialAddress: "",
    houseNumber: "",
    hasHealthCondition: false,
    healthConditionDetails: "",
    hasAllergies: false,
    allergyDetails: "",
    essentialDetails: "",
    parentNRC: "",
    parentOccupation: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, program: prefilledProgram }));
  }, [prefilledProgram]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="enroll">
        <div className="enroll-container fade-in">
          <h1>Thank You for Enrolling!</h1>
          <p>
            We have received your enrollment request for {formData.program}. We’ll
            get back to you soon.
          </p>
          <Link to="/" className="back-link">
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="enroll">
      <div className="enroll-container fade-in">
        <div className="enroll-header">
          <h1>Enroll in Suesland Academy</h1>
          <p className="enroll-subtitle">
            Fill out the form below to enroll your child in our program.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="enroll-form">
          {/* Parent's Name */}
          <div className="form-group">
            <label htmlFor="parentName">Parent’s Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          {/* Child's Name */}
          <div className="form-group">
            <label htmlFor="childName">Child’s Name</label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              required
              placeholder="Enter your child’s full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          {/* Program */}
          <div className="form-group">
            <label htmlFor="program">Program</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a program
              </option>
              <option value="Daycare">Daycare</option>
              <option value="Baby Class">Baby Class</option>
              <option value="Pre-School">Pre-School</option>
              <option value="Grade 1-4">Grade 1-4</option>
            </select>
          </div>

          {/* Residential Address */}
          <div className="form-group">
            <label htmlFor="residentialAddress">Residential Address</label>
            <input
              type="text"
              id="residentialAddress"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
              required
              placeholder="Enter your residential address"
            />
          </div>

          {/* House Number */}
          <div className="form-group">
            <label htmlFor="houseNumber">House Number</label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              placeholder="Enter your house number"
            />
          </div>

          {/* Health Conditions */}
          <div className="form-group">
            <label>Does your child have any health conditions?</label>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="hasHealthCondition"
                name="hasHealthCondition"
                checked={formData.hasHealthCondition}
                onChange={handleChange}
              />
              <label htmlFor="hasHealthCondition">Yes</label>
            </div>
            {formData.hasHealthCondition && (
              <div className="conditional-input">
                <label htmlFor="healthConditionDetails">Specify Health Conditions</label>
                <textarea
                  id="healthConditionDetails"
                  name="healthConditionDetails"
                  value={formData.healthConditionDetails}
                  onChange={handleChange}
                  required
                  placeholder="Please specify the health conditions"
                />
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="form-group">
            <label>Does your child have any allergies?</label>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="hasAllergies"
                name="hasAllergies"
                checked={formData.hasAllergies}
                onChange={handleChange}
              />
              <label htmlFor="hasAllergies">Yes</label>
            </div>
            {formData.hasAllergies && (
              <div className="conditional-input">
                <label htmlFor="allergyDetails">Specify Allergies</label>
                <textarea
                  id="allergyDetails"
                  name="allergyDetails"
                  value={formData.allergyDetails}
                  onChange={handleChange}
                  required
                  placeholder="Please specify the allergies"
                />
              </div>
            )}
          </div>

          {/* Essential Details */}
          <div className="form-group">
            <label htmlFor="essentialDetails">
              Any Other Essential Details We Should Know
            </label>
            <textarea
              id="essentialDetails"
              name="essentialDetails"
              value={formData.essentialDetails}
              onChange={handleChange}
              placeholder="E.g., special needs, dietary restrictions, etc."
            />
          </div>

          {/* Parent's NRC */}
          <div className="form-group">
            <label htmlFor="parentNRC">Parent’s NRC Number</label>
            <input
              type="text"
              id="parentNRC"
              name="parentNRC"
              value={formData.parentNRC}
              onChange={handleChange}
              required
              placeholder="Enter your NRC number"
            />
          </div>

          {/* Parent's Occupation */}
          <div className="form-group">
            <label htmlFor="parentOccupation">Parent’s Occupation</label>
            <input
              type="text"
              id="parentOccupation"
              name="parentOccupation"
              value={formData.parentOccupation}
              onChange={handleChange}
              required
              placeholder="Enter your occupation"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Enrollment
            </button>
            <Link to="/" className="cancel-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Enroll;