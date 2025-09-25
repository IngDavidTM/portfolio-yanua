import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';

const Layout = ({ children, active = 'home', showBackLink = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Lock background scroll when the sidebar menu is open (iOS friendly)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className='div-main'>
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='header-actions'>
            {showBackLink && (
              <Link to='/' className='back-link' onClick={closeMenu}>
                ← Back to Home
              </Link>
            )}
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

      <div className='main-layout'>
        {isMenuOpen && <div className='backdrop' onClick={closeMenu} />}

        <nav
          className={`sidebar ${isMenuOpen ? 'open' : ''}`}
          role='navigation'
          aria-label='Main navigation'
          aria-hidden={!isMenuOpen}
        >
          <div className='nav-items'>
            <Link to='/' className={`nav-item ${active === 'home' ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </Link>
            <Link to='/education' className={`nav-item ${active === 'education' ? 'active' : ''}`} onClick={closeMenu}>
              Education
            </Link>
            <Link to='/experience' className={`nav-item ${active === 'experience' ? 'active' : ''}`} onClick={closeMenu}>
              Experience
            </Link>
            <Link to='/publications' className={`nav-item ${active === 'publications' ? 'active' : ''}`} onClick={closeMenu}>
              Publications
            </Link>
            <Link to='/contact' className={`nav-item ${active === 'contact' ? 'active' : ''}`} onClick={closeMenu}>
              Contact
            </Link>
          </div>
        </nav>

        <main className='content'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

