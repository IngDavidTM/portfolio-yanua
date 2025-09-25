import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';
import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children, active = 'home', showBackLink = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const copy = {
    en: {
      backHome: '← Back to Home',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      navLabel: 'Main navigation',
      nav: {
        home: 'Home',
        education: 'Education',
        experience: 'Experience',
        publications: 'Publications',
        contact: 'Contact',
      },
      languageLabel: 'Switch to Spanish',
      toggleText: 'ES',
    },
    es: {
      backHome: '← Volver al inicio',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
      navLabel: 'Navegación principal',
      nav: {
        home: 'Inicio',
        education: 'Formación',
        experience: 'Experiencia',
        publications: 'Publicaciones',
        contact: 'Contacto',
      },
      languageLabel: 'Cambiar a inglés',
      toggleText: 'EN',
    },
  };

  const texts = copy[language] || copy.en;

  const navLinks = [
    { to: '/', key: 'home' },
    { to: '/education', key: 'education' },
    { to: '/experience', key: 'experience' },
    { to: '/publications', key: 'publications' },
    { to: '/contact', key: 'contact' },
  ];

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
            <nav className='header-nav'>
              {navLinks.map(({ to, key }) => (
                <Link
                  key={key}
                  to={to}
                  className={`header-nav-link ${active === key ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {texts.nav[key]}
                </Link>
              ))}
            </nav>
            {showBackLink && (
              <Link to='/' className='back-link' onClick={closeMenu}>
                {texts.backHome}
              </Link>
            )}
            <button
              type='button'
              className='language-toggle'
              onClick={toggleLanguage}
              aria-label={texts.languageLabel}
            >
              {texts.toggleText}
            </button>
            <button
              className='nav-toggle mobile-toggle'
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? texts.closeMenu : texts.openMenu}
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
          aria-label={texts.navLabel}
          aria-hidden={!isMenuOpen}
        >
          <div className='nav-items'>
            <Link to='/' className={`nav-item ${active === 'home' ? 'active' : ''}`} onClick={closeMenu}>
              {texts.nav.home}
            </Link>
            <Link to='/education' className={`nav-item ${active === 'education' ? 'active' : ''}`} onClick={closeMenu}>
              {texts.nav.education}
            </Link>
            <Link to='/experience' className={`nav-item ${active === 'experience' ? 'active' : ''}`} onClick={closeMenu}>
              {texts.nav.experience}
            </Link>
            <Link to='/publications' className={`nav-item ${active === 'publications' ? 'active' : ''}`} onClick={closeMenu}>
              {texts.nav.publications}
            </Link>
            <Link to='/contact' className={`nav-item ${active === 'contact' ? 'active' : ''}`} onClick={closeMenu}>
              {texts.nav.contact}
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
