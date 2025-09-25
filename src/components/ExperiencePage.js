import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/experience.css';
import Experience from './experience';
import Layout from './Layout';
import getExperienceData from '../data/experienceData';
import { useLanguage } from '../context/LanguageContext';

const ExperiencePage = () => {
  const { language } = useLanguage();
  const copy = {
    en: {
      title: 'Professional & Research Experience',
      subtitle: 'My journey in biotechnology research and laboratory work',
      ongoing: 'Ongoing',
      duration: {
        year: ['year', 'years'],
        month: ['month', 'months'],
        day: ['day', 'days'],
      },
    },
    es: {
      title: 'Experiencia Profesional e Investigativa',
      subtitle: 'Mi trayectoria en investigación biotecnológica y trabajo de laboratorio',
      ongoing: 'En curso',
      duration: {
        year: ['año', 'años'],
        month: ['mes', 'meses'],
        day: ['día', 'días'],
      },
    },
  };

  const texts = copy[language] || copy.en;
  const experienceData = getExperienceData(language);

  return (
    <div className='experience-page'>
      <Layout active='experience' showBackLink>
        <div className='experience-hero'>
          <h1 className='experience-hero-title'>{texts.title}</h1>
          <div className='experience-hero-line'></div>
          <p className='experience-hero-subtitle'>{texts.subtitle}</p>
        </div>

        <div className='experience-content'>
          <div className='experience-grid'>
            {experienceData.map((item) => (
              <Experience
                key={item.id}
                from={item.from}
                to={item.to}
                fromLabel={item.fromLabel}
                toLabel={item.toLabel}
                isCurrent={item.isCurrent}
                durationLabels={texts.duration}
                ongoingLabel={texts.ongoing}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ExperiencePage;
