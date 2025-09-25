import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/education.css';
import Education from './education';
import Layout from './Layout';
import getEducationData from '../data/educationData';
import { useLanguage } from '../context/LanguageContext';

const EducationPage = () => {
  const { language } = useLanguage();
  const copy = {
    en: {
      title: 'Education',
      subtitle: 'My academic journey and professional development',
      visitLabel: 'Visit Institution →',
    },
    es: {
      title: 'Formación Académica',
      subtitle: 'Mi trayectoria académica y desarrollo profesional',
      visitLabel: 'Visitar Institución →',
    },
  };

  const educationData = getEducationData(language);
  const texts = copy[language] || copy.en;

  return (
    <div className='education-page'>
      <Layout active='education' showBackLink>
        <div className='education-hero'>
          <h1 className='education-hero-title'>{texts.title}</h1>
          <div className='education-hero-line'></div>
          <p className='education-hero-subtitle'>{texts.subtitle}</p>
        </div>

        <div className='education-content'>
          {educationData.map((item) => (
            <Education
              key={item.id}
              image={item.image}
              href={item.href}
              name={item.name}
              degree={item.degree}
              year={item.year}
              description={item.description}
              visitLabel={texts.visitLabel}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default EducationPage;
