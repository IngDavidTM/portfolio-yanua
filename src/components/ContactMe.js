import React, { useState } from 'react';
import '../stylesheets/contact.css';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';

      case 'email':
        if (!value.trim()) return 'Please enter your email address';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return '';

      case 'subject':
        if (!value.trim()) return 'Please select a subject for your message';
        return '';

      case 'message':
        if (!value.trim()) return 'Please tell me about your project or inquiry';
        if (value.trim().length < 10) return 'Message must be at least 10 characters long';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate field in real-time
    const error = validateField(name, value);
    setValidationErrors({
      ...validationErrors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmitStatus(null);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    try {
      const response = await fetch('https://formspree.io/f/xeqypjbg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidationErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className='contact-container'>
      <div className='contact-content'>
        <div className='contact-info'>
          <div className='contact-text'>
            <h3 className='contact-title'>Get In Touch</h3>
            <p className='contact-description'>
              I'm always interested in new opportunities and collaborations.
              Whether you have questions about my work or just want to say hello,
              I'd love to hear from you.
            </p>

            <div className='contact-details'>
              <div className='contact-detail'>
                <span className='contact-icon'>📧</span>
                <span>yanua.ledesma.research@gmail.com</span>
              </div>
              <div className='contact-detail'>
                <span className='contact-icon'>📍</span>
                <span>Quito, Ecuador</span>
              </div>
              <div className='contact-detail'>
                <span className='contact-icon'>🔬</span>
                <span>Biotechnology Researcher</span>
              </div>
            </div>
          </div>
        </div>

        <div className='contact-form-section'>
          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>Name *</label>
              <input
                type='text'
                id='name'
                name='name'
                className={`form-input ${validationErrors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder='Your full name'
              />
              {validationErrors.name && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>Email *</label>
              <input
                type='email'
                id='email'
                name='email'
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder='your.email@example.com'
              />
              {validationErrors.email && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='subject' className='form-label'>Subject *</label>
              <select
                id='subject'
                name='subject'
                className={`form-select ${validationErrors.subject ? 'error' : ''}`}
                value={formData.subject}
                onChange={handleChange}
              >
                <option value=''>Select a subject</option>
                <option value='Collaboration'>Collaboration</option>
                <option value='Research Inquiry'>Research Inquiry</option>
                <option value='Job Opportunity'>Job Opportunity</option>
                <option value='Speaking Engagement'>Speaking Engagement</option>
                <option value='Other'>Other</option>
              </select>
              {validationErrors.subject && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.subject}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='message' className='form-label'>Message *</label>
              <textarea
                id='message'
                name='message'
                className={`form-textarea ${validationErrors.message ? 'error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder='Tell me about your project or inquiry...'
                rows='6'
              />
              {validationErrors.message && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.message}
                </div>
              )}
            </div>

            <button
              type='submit'
              className='submit-button'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className='submitting-text'>
                  <span className='spinner'></span>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {submitStatus === 'success' && (
              <div className='success-message'>
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className='error-message'>
                ❌ Sorry, there was an error sending your message. Please try again or contact me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
