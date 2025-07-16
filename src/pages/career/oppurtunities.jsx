'use client';
import React, { useState } from 'react';

export default function OpportunitiesForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    role: '',
    currentSalary: '',
    expectedSalary: '',
    linkedin: '',
    resume: null,
    skills: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');
    setError('');

    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phone', `${formData.phoneCode} ${formData.phoneNumber}`);
      payload.append('country', formData.country);
      payload.append('city', formData.city);
      payload.append('role', formData.role);
      payload.append('currentSalary', formData.currentSalary);
      payload.append('expectedSalary', formData.expectedSalary);
      payload.append('linkedin', formData.linkedin);
      payload.append('skills', formData.skills);
      if (formData.resume) {
        payload.append('resume', formData.resume);
      }

      const res = await fetch('/api/oppurtunity', {
        method: 'POST',
        body: payload,
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setSuccess('Your application has been submitted!');
        setFormData({
          fullName: '',
          email: '',
          phoneCode: '+91',
          phoneNumber: '',
          country: '',
          city: '',
          role: '',
          currentSalary: '',
          expectedSalary: '',
          linkedin: '',
          resume: null,
          skills: '',
        });
      } else {
        setError(result.message || 'Submission failed.');
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2 style={{fontFamily:'Luxerie, sans-serif'}}>Opportunities For Growth</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Enter"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ph Number*</label>
              <div className="phone-row">
                <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+91">+91</option>
                  <option value="+92">+92</option>
                  <option value="+971">+971</option>
                  <option value="+880">+880</option>
                  <option value="+86">+86</option>
                  <option value="+81">+81</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+55">+55</option>
                  <option value="+7">+7</option>
                  <option value="+27">+27</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Current Salary</label>
              <input
                type="text"
                name="currentSalary"
                placeholder="Enter"
                value={formData.currentSalary}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Expected Salary</label>
              <input
                type="text"
                name="expectedSalary"
                placeholder="Enter"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                placeholder="Enter"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Please mention your top skills and the areas you’re best at.</label>
            <textarea
              name="skills"
              className='resize-none'
              rows="4"
              placeholder="Select"
              value={formData.skills}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {success && <p className="success-msg">{success}</p>}
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
}
