import React, { useState, useEffect, useRef } from 'react';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';
import ContactMe from './contactMe';
import { Link } from 'react-router-dom';

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentImage, setCurrentImage] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselIntervalRef = useRef(null);
  const totalImages = 4;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    // Handle education, experience, and publications navigation with routing
    if (sectionId === 'education' || sectionId === 'experience' || sectionId === 'publications') {
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      return;
    }

    // Handle other sections with scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['main', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carrusel automático
  useEffect(() => {
    const startCarousel = () => {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
      }, 4000); // Cambiar cada 4 segundos
    };

    const stopCarousel = () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };

    startCarousel();

    // Pausar carrusel cuando el usuario hace hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopCarousel);
      heroSection.addEventListener('mouseleave', startCarousel);
    }

    return () => {
      stopCarousel();
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', stopCarousel);
        heroSection.removeEventListener('mouseleave', startCarousel);
      }
    };
  }, [totalImages]);

  // Función de navegación del carrusel
  const goToImage = (imageNumber) => {
    setCurrentImage(imageNumber);
  };

  // Gestos táctiles para móvil
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
    } else if (isRightSwipe) {
      setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1));
    }
  };

  return(
    <div className='div-main'>
      {/* Header */}
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
            <img className='logo' src={dna} alt='Yanua Ledesma Logo' />
            <h1 className='logo-text'>Yanua Ledesma</h1>
          </div>
          <div className='nav-toggle' onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <div className='main-layout'>
        {/* Sidebar Navigation */}
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <div className='nav-items'>
            <button
              className={`nav-item ${activeSection === 'main' ? 'active' : ''}`}
              onClick={() => scrollToSection('main')}
            >
              Home
            </button>
            <Link
              to="/education"
              className={`nav-item ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </Link>
            <Link
              to="/experience"
              className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              to="/publications"
              className={`nav-item ${activeSection === 'publications' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Publications
            </Link>
            <button
              className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className='content'>
          <section id='main' className='hero-section'>
            <div className='hero-content'>
              <div className='hero-text'>
                <h1 className='hero-title'>Hi, I'm Yanua!</h1>
                <h2 className='hero-subtitle'>Biotechnology Researcher & Scientist</h2>
                <p className='hero-description'>
                  Science has allowed me to understand how life works around me and has introduced me to the investigation of new fields. I am passionate about discovering new problems and finding solutions. I am a leader, persistent, curious, and focused on issues related to public and animal health. My aspirations are the application of knowledge, with biotechnological tools, in search of common wellness.
                </p>
                <div className='hero-actions'>
                  <button className='btn-primary' onClick={() => scrollToSection('experience')}>
                    View My Work
                  </button>
                  <button className='btn-secondary' onClick={() => scrollToSection('contact')}>
                    Get In Touch
                  </button>
                </div>
              </div>
              <div className='hero-image'>
                <div 
                  className='carousel-container'
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={require(`../images/scroll${currentImage}.jpg`)}
                    alt={`Portfolio slide ${currentImage}`}
                    className='carousel-image'
                    draggable={false}
                  />
                  <div className='carousel-indicators'>
                    {Array.from({ length: totalImages }, (_, index) => (
                      <button
                        key={index + 1}
                        className={`indicator ${currentImage === index + 1 ? 'active' : ''}`}
                        onClick={() => goToImage(index + 1)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='contact' id='contact'>
            <div className='section-header'>
              <h2 className='section-title'>Contact Me</h2>
              <div className='section-line'></div>
            </div>
            <ContactMe />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Main;