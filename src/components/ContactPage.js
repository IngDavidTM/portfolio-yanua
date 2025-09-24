import React, { useState, useEffect } from 'react';
import '../stylesheets/contact.css';
import ContactMe from './ContactMe';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <div className='contact-page'>
      {/* Header - Same as main page */}
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='contact-nav-section'>
            <Link to="/" className='contact-back-link'>
              ← Back to Home
            </Link>
            <button
              className='nav-toggle'
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation - Same as main page */}
      <nav
        className={`sidebar ${isMenuOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className='nav-items'>
          <Link
            to="/"
            className='nav-item'
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/education"
            className='nav-item'
            onClick={closeMenu}
          >
            Education
          </Link>
          <Link
            to="/experience"
            className='nav-item'
            onClick={closeMenu}
          >
            Experience
          </Link>
          <Link
            to="/publications"
            className='nav-item'
            onClick={closeMenu}
          >
            Publications
          </Link>
          <div className='nav-item active'>
            Contact
          </div>
        </div>
      </nav>

      <div className='main-layout'>
        {/* Main Content */}
        <main className='content'>
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
        </main>
      </div>
    </div>
  );
};

export default ContactPage;
