import React, { useState, useEffect } from 'react';
import '../stylesheets/education.css';
import Education from './education';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';

const EducationPage = () => {
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
    <div className='education-page'>
      {/* Header - Same as main page */}
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='education-nav-section'>
            <Link to="/" className='education-back-link'>
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
          <div className='nav-item active'>
            Education
          </div>
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
          <Link
            to="/#contact"
            className='nav-item'
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      </nav>

      <div className='main-layout'>
        {/* Main Content */}
        <main className='content'>
        <div className='education-hero'>
          <h1 className='education-hero-title'>Education</h1>
          <div className='education-hero-line'></div>
          <p className='education-hero-subtitle'>
            My academic journey and professional development
          </p>
        </div>

        <div className='education-content'>
          <Education
            image='udla.jpg'
            href='https://www.udla.edu.ec/'
            name='University of the Americas (UDLA)'
            degree='Degree in Biotechnology'
            year='2022'
            description={['Biotechnology Engineer', 'Senescyt register: 1040-2022-2444386']}
          />
        </div>
      </main>
      </div>
    </div>
  );
};

export default EducationPage;
