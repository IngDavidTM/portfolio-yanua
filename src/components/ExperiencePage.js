import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/experience.css';
import Experience from './experience';
import Layout from './Layout';
import experienceData from '../data/experience.json';

const ExperiencePage = () => {
  return (
    <div className='experience-page'>
      <Layout active='experience' showBackLink>
        <div className='experience-hero'>
          <h1 className='experience-hero-title'>Professional & Research Experience</h1>
          <div className='experience-hero-line'></div>
          <p className='experience-hero-subtitle'>
            My journey in biotechnology research and laboratory work
          </p>
        </div>

        <div className='experience-content'>
          <div className='experience-grid'>
            {experienceData.map((item) => (
              <Experience
                key={item.id}
                from={item.from}
                to={item.to}
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
