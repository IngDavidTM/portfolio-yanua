import React, { useState, useEffect, useRef } from 'react';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';
import Experience from './experience';
import Publications from './publications';
import Contributions from './contributions';
import References from './references';
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
    // Handle education navigation with routing
    if (sectionId === 'education') {
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
      const sections = ['main', 'experience', 'publications', 'contributions', 'references', 'contact'];
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
            <button
              className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
            <button
              className={`nav-item ${activeSection === 'publications' ? 'active' : ''}`}
              onClick={() => scrollToSection('publications')}
            >
              Publications
            </button>
            <button
              className={`nav-item ${activeSection === 'contributions' ? 'active' : ''}`}
              onClick={() => scrollToSection('contributions')}
            >
              Contributions
            </button>
            <button
              className={`nav-item ${activeSection === 'references' ? 'active' : ''}`}
              onClick={() => scrollToSection('references')}
            >
              References
            </button>
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

          <section className='experience' id='experience'>
            <div className='section-header'>
              <h2 className='section-title'>Professional & Research Experience</h2>
              <div className='section-line'></div>
            </div>
            <div className='experience-grid'>
              <Experience
                from='January 2020'
                to='March 2020'
                title='Pre-professional practices in the University of the Americas Research Laboratories'
                description='Isolation and microbiological and biochemical identification of colisstin resistant bacteria using microbiology and molecular biology. Quito, Ecuador'
                hours={166}
              />
              <Experience
                from='January 2021'
                to='September 2021'
                title='Pre-professional practices in Zoonosis Research Institute - C.I.Z Laboratories from the Central University of Ecuador'
                description='Immunological diagnosis of diseases such as neospora, Q-fever and prototheca. Culture and molecular identification of prototheca, tuberculous and environmental mycobacteria. Quito, Ecuador'
                hours={504}
              />
              <Experience
                from='January 2021'
                to='February 2022'
                title='Pre-professional practices in the University of the Americas Research Laboratories'
                description='Molecular, bioinformatic and cladistic identification of non-tuberculos mycobacteria isolated from patients from Venezuela. Quito, Ecuador'
                hours={433}
              />
              <Experience
                from='February 2022'
                to='Present'
                title='Professional practices in the University of the Americas Research Laboratories'
                description="Molecular and bioinformatic orchid's identification from Ecuadorian Andes and Amazon. Cattle genotyping. Quito, Ecuador"
                hours={'...'}
              />
            </div>
          </section>

          <section className='publications' id='publications'>
            <div className='section-header'>
              <h2 className='section-title'>Publications</h2>
              <div className='section-line'></div>
            </div>
            <Publications num={1} image='paper1' link='https://www.mdpi.com/2076-0817/11/10/1159' pub='https://pubmed.ncbi.nlm.nih.gov/36297216/' doi='https://doi.org/10.3390/pathogens11101159'/>
          </section>

          <section className='contributions' id='contributions'>
            <div className='section-header'>
              <h2 className='section-title'>Contributions</h2>
              <div className='section-line'></div>
            </div>
            <Contributions />
          </section>

          <section className='references' id='references'>
            <div className='section-header'>
              <h2 className='section-title'>References</h2>
              <div className='section-line'></div>
            </div>
            <References />
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