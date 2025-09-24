import React, { useState, useEffect } from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/publications.css';
import { Link } from 'react-router-dom';
import dna from '../images/dna.png';
import publicationsData from '../data/publications.json';

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
              {publicationsData.map((publication) => (
                <div key={publication.id} className='publication-card-horizontal'>
                  <div className='publication-cover'>
                    <div className='publication-cover-text'>
                      <div className='journal-icon-large'>📄</div>
                      <div className='publication-year-badge'>{publication.year}</div>
                      <div className='cover-title'>{publication.journal}</div>
                      <div className='cover-subtitle'>Scientific Journal</div>
                    </div>
                  </div>

                  <div className='publication-details'>
                    <div className='publication-header-info'>
                      <div className='publication-journal-horizontal'>
                        <span className='journal-badge'>{publication.journal}</span>
                        <span className='publisher-badge'>{publication.publisher}</span>
                      </div>
                    </div>

                    <h3 className='publication-title-horizontal'>
                      {publication.title}
                    </h3>

                    <div className='publication-authors-horizontal'>
                      <div className='authors-list'>
                        {publication.authors.map((author, index) => (
                          <React.Fragment key={index}>
                            {index === 0 && <span className='lead-author'>{author}</span>}
                            {index > 0 && author}
                            <sup>{publication.affiliations[index]}</sup>
                            {index < publication.authors.length - 1 && ', '}
                            {index === publication.authors.length - 2 && ' and '}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className='publication-abstract'>
                      <p className='abstract-text'>
                        {publication.abstract}
                      </p>
                    </div>

                    <div className='publication-actions-horizontal'>
                      <a
                        href={publication.links.article}
                        target='_blank'
                        rel='noreferrer'
                        className='action-btn primary'
                      >
                        <span>📄</span>
                        Read Paper
                      </a>
                      <a
                        href={publication.links.pubmed}
                        target='_blank'
                        rel='noreferrer'
                        className='action-btn secondary'
                      >
                        PubMed
                      </a>
                      <button
                        className='action-btn tertiary'
                        onClick={() => copyToClipboard(publication.doi)}
                      >
                        <span>📋</span>
                        Copy DOI
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicationsPage;
