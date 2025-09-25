import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/contact.css';
import ContactMe from './ContactMe';
import Layout from './Layout';

const ContactPage = () => {
  return (
    <div className='contact-page'>
      <Layout active='contact' showBackLink>
        <div className='contact-hero'>
          <h1 className='contact-hero-title'>Contact Me</h1>
          <div className='contact-hero-line'></div>
          <p className='contact-hero-subtitle'>
            Let's connect and explore opportunities together
          </p>
        </div>

        <div className='contact-content-wrapper'>
          <ContactMe />
        </div>
      </Layout>
    </div>
  );
};

export default ContactPage;
