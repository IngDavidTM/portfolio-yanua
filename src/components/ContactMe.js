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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
                className='form-input'
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Your full name'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>Email *</label>
              <input
                type='email'
                id='email'
                name='email'
                className='form-input'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='your.email@example.com'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='subject' className='form-label'>Subject *</label>
              <select
                id='subject'
                name='subject'
                className='form-select'
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value=''>Select a subject</option>
                <option value='Collaboration'>Collaboration</option>
                <option value='Research Inquiry'>Research Inquiry</option>
                <option value='Job Opportunity'>Job Opportunity</option>
                <option value='Speaking Engagement'>Speaking Engagement</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='message' className='form-label'>Message *</label>
              <textarea
                id='message'
                name='message'
                className='form-textarea'
                value={formData.message}
                onChange={handleChange}
                required
                placeholder='Tell me about your project or inquiry...'
                rows='6'
              />
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
