import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/contact.css';
import ContactMe from './ContactMe';
import Layout from './Layout';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { language } = useLanguage();
  const copy = {
    en: {
      title: 'Contact Me',
      subtitle: "Let's connect and explore opportunities together",
    },
    es: {
      title: 'Contáctame',
      subtitle: 'Conversemos y exploremos oportunidades juntas(os)',
    },
  };

  const texts = copy[language] || copy.en;

  return (
    <div className='contact-page'>
      <Layout active='contact' showBackLink>
        <div className='contact-hero'>
          <h1 className='contact-hero-title'>{texts.title}</h1>
          <div className='contact-hero-line'></div>
          <p className='contact-hero-subtitle'>{texts.subtitle}</p>
        </div>

        <div className='contact-content-wrapper'>
          <ContactMe />
        </div>
      </Layout>
    </div>
  );
};

export default ContactPage;
