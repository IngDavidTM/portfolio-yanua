import React, { useState, useEffect } from 'react';
import '../stylesheets/experience.css';
import Experience from './experience';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';

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
            to="/#contributions"
            className='nav-item'
            onClick={closeMenu}
          >
            Contributions
          </Link>
          <Link
            to="/#references"
            className='nav-item'
            onClick={closeMenu}
          >
            References
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
          <div className='experience-hero'>
            <h1 className='experience-hero-title'>Professional & Research Experience</h1>
            <div className='experience-hero-line'></div>
            <p className='experience-hero-subtitle'>
              My journey in biotechnology research and laboratory work
            </p>
          </div>

          <div className='experience-content'>
            <div className='experience-grid'>
              <Experience
                from='January 2020'
                to='March 2020'
                title='Pre-professional practices in the University of the Americas Research Laboratories'
                description='Isolation and microbiological and biochemical identification of colisstin resistant bacteria using microbiology and molecular biology. Quito, Ecuador'
                hours={480}
              />
              <Experience
                from='January 2021'
                to='September 2021'
                title='Pre-professional practices in Zoonosis Research Institute - C.I.Z Laboratories from the Central University of Ecuador'
                description='Immunological diagnosis of diseases such as neospora, Q-fever and prototheca. Culture and molecular identification of prototheca, tuberculous and environmental mycobacteria. Quito, Ecuador'
                hours={1440}
              />
              <Experience
                from='January 2021'
                to='February 2022'
                title='Pre-professional practices in the University of the Americas Research Laboratories'
                description='Molecular, bioinformatic and cladistic identification of non-tuberculos mycobacteria isolated from patients from Venezuela. Quito, Ecuador'
                hours={2080}
              />
              <Experience
                from='February 2022'
                to='Present'
                title='Professional practices in the University of the Americas Research Laboratories'
                description="Molecular and bioinformatic orchid's identification from Ecuadorian Andes and Amazon. Cattle genotyping. Quito, Ecuador"
                hours={'...'}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExperiencePage;
