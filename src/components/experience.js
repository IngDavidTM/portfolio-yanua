import React from 'react';
import '../stylesheets/experience.css';

const Experience = (props) => {
  return (
    <div className='experience-div'>
      <div>
        <h3>From {props.from} to {props.to} <i className='fa-solid fa-microscope'></i></h3>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
      <div className='hours-background'>
        <h3><i class="fa-regular fa-clock"></i> {props.hours} hours</h3>
      </div>
    </div>
  );
};

export default Experience;