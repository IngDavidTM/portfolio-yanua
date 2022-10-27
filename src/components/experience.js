import React from 'react';
import '../stylesheets/experience.css';

const Experience = (props) => {
  return (
    <div className='experience-div'>
      <div className='hours-background'>
        <h3>{props.hours}h</h3>
      </div>
      <div>
        <h3>From {props.from} to {props.to}</h3>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Experience;