import React from 'react';
import '../stylesheets/education.css';

const Education = (props) => {
  const descriptionElem = props.description.map((description, index) => (
    <li key={index} className='education-detail-item'>
      <span className='education-detail-icon'>•</span>
      <span className='education-detail-text'>{description}</span>
    </li>
  ));

  return(
    <div className='education-card'>
      <div className='education-card-header'>
        <div className='education-logo-container'>
          <img
            className='education-logo'
            src={require(`../images/${props.image}`)}
            alt={`${props.name} logo`}
          />
        </div>
        <div className='education-card-content'>
          <div className='education-year-badge'>{props.year}</div>
          <h2 className='education-title'>{props.name}</h2>
          <h3 className='education-degree'>{props.degree}</h3>
        </div>
      </div>
      <div className='education-details'>
        <ul className='education-details-list'>
          {descriptionElem}
        </ul>
      </div>
      <div className='education-card-footer'>
        <a
          href={props.href}
          target='_blank'
          rel='noreferrer'
          className='education-link'
        >
          Visit Institution →
        </a>
      </div>
    </div>
  );
};

export default Education;