import React, { useState, useEffect } from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/experience.css';
import Experience from './experience';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';
import experienceData from '../data/experience.json';

const ExperiencePage = () => {
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
    <div className='experience-page'>
      {/* Header - Same as main page */}
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='experience-nav-section'>
            <Link to="/" className='experience-back-link'>
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
          <div className='nav-item active'>
            Experience
          </div>
          <Link
            to="/publications"
            className='nav-item'
            onClick={closeMenu}
          >
            Publications
          </Link>
          <Link
            to="/contact"
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
          <div className='experience-hero'>
            <h1 className='experience-hero-title'>Professional & Research Experience</h1>
            <div className='experience-hero-line'></div>
            <p className='experience-hero-subtitle'>
              My journey in biotechnology research and laboratory work
            </p>
          </div>

          <div className='experience-content'>
            <div className='experience-grid'>
              {experienceData.map((item) => (
                <Experience
                  key={item.id}
                  from={item.from}
                  to={item.to}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExperiencePage;
