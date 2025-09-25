import React, { useState, useEffect, useRef } from 'react';
import '../stylesheets/mainPage.css';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useLanguage } from '../context/LanguageContext';
import cvFile from '../CV/CV_Yanua_Ledesma_EN.docx';

const Main = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselIntervalRef = useRef(null);
  const totalImages = 4;

  // (Menu scroll lock now handled in Layout)

  const scrollToSection = (sectionId) => {
    // Handle navigation to dedicated pages
    if (sectionId === 'education') {
      navigate('/education');
      return;
    }

    if (sectionId === 'experience') {
      navigate('/experience');
      return;
    }

    if (sectionId === 'publications') {
      navigate('/publications');
      return;
    }

    if (sectionId === 'contact') {
      navigate('/contact');
      return;
    }

    // Handle scroll within the main page
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {};
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

  const copy = {
    en: {
      heroTitle: "Hi, I'm Yanua!",
      heroSubtitle: 'Biotechnology Researcher & Scientist',
      heroDescription:
        'Science has allowed me to understand how life works around me and has introduced me to the investigation of new fields. I am passionate about discovering new problems and finding solutions. I am a leader, persistent, curious, and focused on issues related to public and animal health. My aspirations are the application of knowledge, with biotechnological tools, in search of common wellness.',
      primaryCta: 'View My Work',
      secondaryCta: 'Get In Touch',
      downloadCv: 'Download CV',
      slideAria: (index) => `Go to slide ${index}`,
      slideAlt: (index) => `Portfolio slide ${index}`,
    },
    es: {
      heroTitle: '¡Hola, soy Yanua!',
      heroSubtitle: 'Investigadora y Científica en Biotecnología',
      heroDescription:
        'La ciencia me ha permitido comprender cómo funciona la vida a mi alrededor y me ha llevado a explorar nuevos campos de investigación. Me apasiona descubrir nuevos problemas y encontrar soluciones. Soy líder, persistente, curiosa y estoy enfocada en temas relacionados con la salud pública y animal. Mis aspiraciones se centran en aplicar el conocimiento, con herramientas biotecnológicas, en busca del bienestar común.',
      primaryCta: 'Ver mi trabajo',
      secondaryCta: 'Contáctame',
      downloadCv: 'Descargar CV',
      slideAria: (index) => `Ir a la diapositiva ${index}`,
      slideAlt: (index) => `Diapositiva de portafolio ${index}`,
    },
  };

  const texts = copy[language] || copy.en;

  return (
    <Layout active='home' showBackLink={false}>
      <section id='main' className='hero-section'>
        <div className='hero-content'>
          <div className='hero-text'>
            <h1 className='hero-title'>{texts.heroTitle}</h1>
            <h2 className='hero-subtitle'>{texts.heroSubtitle}</h2>
            <p className='hero-description'>{texts.heroDescription}</p>
            <div className='hero-actions'>
              <button className='btn-primary' onClick={() => scrollToSection('experience')}>
                {texts.primaryCta}
              </button>
              <button className='btn-secondary' onClick={() => scrollToSection('contact')}>
                {texts.secondaryCta}
              </button>
              <a
                className='btn-secondary btn-icon'
                href={cvFile}
                download
                target='_blank'
                rel='noreferrer'
                aria-label={texts.downloadCv}
                title={texts.downloadCv}
              >
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                >
                  <path d='M12 3v12' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                  <path d='M7 10l5 5 5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M4 21h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                </svg>
              </a>
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
                alt={texts.slideAlt(currentImage)}
                className='carousel-image'
                draggable={false}
              />
              <div className='carousel-indicators'>
                {Array.from({ length: totalImages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`indicator ${currentImage === index + 1 ? 'active' : ''}`}
                    onClick={() => goToImage(index + 1)}
                    aria-label={texts.slideAria(index + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Main;
