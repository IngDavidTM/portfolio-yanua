import React, { useState, useEffect } from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/publications.css';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';

const PublicationsPage = () => {
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

  const copyToClipboard = (doi) => {
    navigator.clipboard.writeText(doi);
  };

  return (
    <div className='publications-page'>
      {/* Header - Same as main page */}
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='publications-nav-section'>
            <Link to="/" className='publications-back-link'>
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
          <div className='nav-item active'>
            Publications
          </div>
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
          <div className='publications-hero'>
            <h1 className='publications-hero-title'>Publications</h1>
            <div className='publications-hero-line'></div>
            <p className='publications-hero-subtitle'>
              My research contributions and scientific publications
            </p>
          </div>

          <div className='publications-content'>
            <div className='publications-grid'>
              <div className='publication-card-horizontal'>
                <div className='publication-cover'>
                  <div className='publication-cover-text'>
                    <div className='journal-icon-large'>📄</div>
                    <div className='publication-year-badge'>2022</div>
                    <div className='cover-title'>Pathogens</div>
                    <div className='cover-subtitle'>Scientific Journal</div>
                  </div>
                </div>

                <div className='publication-details'>
                  <div className='publication-header-info'>
                    <div className='publication-journal-horizontal'>
                      <span className='journal-badge'>Pathogens</span>
                      <span className='publisher-badge'>MDPI</span>
                    </div>
                  </div>

                  <h3 className='publication-title-horizontal'>
                    The Re-Identification of Previously Unidentifiable Clinical
                    Non-Tuberculous Mycobacterial Isolates Shows Great Species
                    Diversity and the Presence of Other Acid-Fast Genera
                  </h3>

                  <div className='publication-authors-horizontal'>
                    <div className='authors-list'>
                      <span className='lead-author'>Yanua Ledesma</span><sup>1†</sup>,
                      Gustavo Echeverria<sup>2,3†</sup>,
                      Franklin E. Claro-Almea<sup>4†</sup>,
                      Douglas Silva<sup>4†</sup>,
                      Salomé Guerrero-Freire<sup>1,3</sup>,
                      Yeimy Rojas<sup>5</sup>,
                      Carlos Bastidas-Caldes<sup>6</sup>,
                      Juan Carlos Navarro<sup>8</sup>
                      and Jacobus H. de Waard<sup>1,2,4†</sup>
                    </div>
                  </div>

                  <div className='publication-abstract'>
                    <p className='abstract-text'>
                      This study presents a comprehensive analysis of clinical mycobacterial isolates,
                      demonstrating significant species diversity through advanced molecular identification
                      techniques and revealing the presence of previously undetected acid-fast genera
                      in clinical samples.
                    </p>
                  </div>

                  <div className='publication-actions-horizontal'>
                    <a
                      href='https://www.mdpi.com/2076-0817/11/10/1159'
                      target='_blank'
                      rel='noreferrer'
                      className='action-btn primary'
                    >
                      <span>📄</span>
                      Read Paper
                    </a>
                    <a
                      href='https://pubmed.ncbi.nlm.nih.gov/36297216/'
                      target='_blank'
                      rel='noreferrer'
                      className='action-btn secondary'
                    >
                      PubMed
                    </a>
                    <button
                      className='action-btn tertiary'
                      onClick={() => copyToClipboard('https://doi.org/10.3390/pathogens11101159')}
                    >
                      <span>📋</span>
                      Copy DOI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicationsPage;
