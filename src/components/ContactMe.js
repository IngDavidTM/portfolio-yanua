import React, { useMemo, useState } from 'react';
import '../stylesheets/contact.css';
import { useLanguage } from '../context/LanguageContext';

const ContactMe = () => {
  const { language } = useLanguage();
  const copy = useMemo(
    () => ({
      en: {
        sectionTitle: 'Get In Touch',
        description:
          "I'm always interested in new opportunities and collaborations. Whether you have questions about my work or just want to say hello, I'd love to hear from you.",
        details: {
          email: 'yanua.ledesma.research@gmail.com',
          location: 'Quito, Ecuador',
          role: 'Biotechnology Researcher',
        },
        form: {
          labels: {
            name: 'Name *',
            email: 'Email *',
            subject: 'Subject *',
            message: 'Message *',
          },
          placeholders: {
            name: 'Your full name',
            email: 'your.email@example.com',
            message: 'Tell me about your project or inquiry...',
          },
          subjectOptions: [
            { value: '', label: 'Select a subject' },
            { value: 'Collaboration', label: 'Collaboration' },
            { value: 'Research Inquiry', label: 'Research Inquiry' },
            { value: 'Job Opportunity', label: 'Job Opportunity' },
            { value: 'Speaking Engagement', label: 'Speaking Engagement' },
            { value: 'Other', label: 'Other' },
          ],
          submit: 'Send Message',
          sending: 'Sending...',
        },
        validation: {
          name: {
            required: 'Please enter your full name',
            min: 'Name must be at least 2 characters long',
            pattern: 'Name can only contain letters and spaces',
          },
          email: {
            required: 'Please enter your email address',
            pattern: 'Please enter a valid email address',
          },
          subject: {
            required: 'Please select a subject for your message',
          },
          message: {
            required: 'Please tell me about your project or inquiry',
            min: 'Message must be at least 10 characters long',
            max: 'Message must be less than 1000 characters',
          },
        },
        feedback: {
          success: "Message sent successfully! I'll get back to you soon.",
          network: 'Network error. Please check your connection and try again.',
        },
      },
      es: {
        sectionTitle: 'Ponte en contacto',
        description:
          'Siempre estoy interesada en nuevas oportunidades y colaboraciones. Si tienes preguntas sobre mi trabajo o simplemente quieres saludar, estaré encantada de leerte.',
        details: {
          email: 'yanua.ledesma.research@gmail.com',
          location: 'Quito, Ecuador',
          role: 'Investigadora en Biotecnología',
        },
        form: {
          labels: {
            name: 'Nombre *',
            email: 'Correo *',
            subject: 'Asunto *',
            message: 'Mensaje *',
          },
          placeholders: {
            name: 'Tu nombre completo',
            email: 'tu.correo@ejemplo.com',
            message: 'Cuéntame sobre tu proyecto o consulta...',
          },
          subjectOptions: [
            { value: '', label: 'Selecciona un asunto' },
            { value: 'Collaboration', label: 'Colaboración' },
            { value: 'Research Inquiry', label: 'Consulta de investigación' },
            { value: 'Job Opportunity', label: 'Oportunidad laboral' },
            { value: 'Speaking Engagement', label: 'Invitación a charla' },
            { value: 'Other', label: 'Otro' },
          ],
          submit: 'Enviar mensaje',
          sending: 'Enviando...',
        },
        validation: {
          name: {
            required: 'Ingresa tu nombre completo',
            min: 'El nombre debe tener al menos 2 caracteres',
            pattern: 'El nombre solo puede contener letras y espacios',
          },
          email: {
            required: 'Ingresa tu correo electrónico',
            pattern: 'Ingresa un correo electrónico válido',
          },
          subject: {
            required: 'Selecciona un asunto para tu mensaje',
          },
          message: {
            required: 'Cuéntame sobre tu proyecto o consulta',
            min: 'El mensaje debe tener al menos 10 caracteres',
            max: 'El mensaje debe tener menos de 1000 caracteres',
          },
        },
        feedback: {
          success: '¡Mensaje enviado con éxito! Te responderé muy pronto.',
          network: 'Error de red. Revisa tu conexión e inténtalo nuevamente.',
        },
      },
    }),
    []
  );

  const texts = copy[language] || copy.en;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitMessageKey, setSubmitMessageKey] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return texts.validation.name.required;
        if (value.trim().length < 2) return texts.validation.name.min;
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim())) return texts.validation.name.pattern;
        return '';

      case 'email':
        if (!value.trim()) return texts.validation.email.required;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return texts.validation.email.pattern;
        return '';

      case 'subject':
        if (!value.trim()) return texts.validation.subject.required;
        return '';

      case 'message':
        if (!value.trim()) return texts.validation.message.required;
        if (value.trim().length < 10) return texts.validation.message.min;
        if (value.trim().length > 1000) return texts.validation.message.max;
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
          setSubmitMessageKey(null);

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
      setSubmitMessageKey('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setValidationErrors({});

    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      setSubmitMessageKey('network');
    }

    setIsSubmitting(false);
  };

  return (
    <div className='contact-container'>
      <div className='contact-content'>
        <div className='contact-info'>
          <div className='contact-text'>
            <h3 className='contact-title'>{texts.sectionTitle}</h3>
            <p className='contact-description'>{texts.description}</p>

            <div className='contact-details'>
              <div className='contact-detail'>
                <span className='contact-icon'>📧</span>
                <span>{texts.details.email}</span>
              </div>
              <div className='contact-detail'>
                <span className='contact-icon'>📍</span>
                <span>{texts.details.location}</span>
              </div>
              <div className='contact-detail'>
                <span className='contact-icon'>🔬</span>
                <span>{texts.details.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='contact-form-section'>
          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>{texts.form.labels.name}</label>
              <input
                type='text'
                id='name'
                name='name'
                className={`form-input ${validationErrors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder={texts.form.placeholders.name}
              />
              {validationErrors.name && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>{texts.form.labels.email}</label>
              <input
                type='email'
                id='email'
                name='email'
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder={texts.form.placeholders.email}
              />
              {validationErrors.email && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='subject' className='form-label'>{texts.form.labels.subject}</label>
              <select
                id='subject'
                name='subject'
                className={`form-select ${validationErrors.subject ? 'error' : ''}`}
                value={formData.subject}
                onChange={handleChange}
              >
                {texts.form.subjectOptions.map((option) => (
                  <option key={option.value || 'empty'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {validationErrors.subject && (
                <div className='validation-error'>
                  <span className='error-icon'>⚠️</span>
                  {validationErrors.subject}
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='message' className='form-label'>{texts.form.labels.message}</label>
              <textarea
                id='message'
                name='message'
                className={`form-textarea ${validationErrors.message ? 'error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder={texts.form.placeholders.message}
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
                  {texts.form.sending}
                </span>
              ) : (
                texts.form.submit
              )}
            </button>

            {submitStatus === 'success' && submitMessageKey && (
              <div className='success-message'>
                ✅ {texts.feedback[submitMessageKey]}
              </div>
            )}

            {submitStatus === 'error' && submitMessageKey && (
              <div className='error-message'>
                ❌ {texts.feedback[submitMessageKey]}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
