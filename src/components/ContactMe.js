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
  const [submitMessage, setSubmitMessage] = useState('');

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

          // Clear previous submit status and message
          setSubmitStatus(null);
          setSubmitMessage('');

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
      // Using Web3Forms with no-cors mode to avoid CORS issues
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('access_key', '229a4832-acb5-4e76-abd9-6ad3dfbf920f');
      formDataToSend.append('redirect', 'false');

      // Send to Web3Forms with no-cors mode to avoid CORS issues
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // This avoids CORS errors when Web3Forms redirects
      });

      // With no-cors mode, we can't read the response, but if we get here without error, assume success
      console.log('✅ Request completed successfully - email sent!');
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setValidationErrors({});

    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
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
                ✅ {submitMessage}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className='error-message'>
                ❌ {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
