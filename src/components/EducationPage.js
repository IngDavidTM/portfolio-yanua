import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/education.css';
import Education from './education';
import Layout from './Layout';
import educationData from '../data/education.json';

const EducationPage = () => {
  return (
    <div className='education-page'>
      <Layout active='education' showBackLink>
        <div className='education-hero'>
          <h1 className='education-hero-title'>Education</h1>
          <div className='education-hero-line'></div>
          <p className='education-hero-subtitle'>
            My academic journey and professional development
          </p>
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
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default EducationPage;
