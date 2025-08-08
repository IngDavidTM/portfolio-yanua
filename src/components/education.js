import React from 'react';
import '../stylesheets/education.css';

const Education = (props) => {
  const descriptionElem= [];
  props.description.forEach((description) => {
    descriptionElem.push(<p>- {description}</p>);
  });
  return(
    <div className='education-div'>
      <a href={props.href} target='_blank' rel='noreferrer'><img alt={props.name} src={require(`../images/${props.image}`)} /></a>
      <h2>{props.year}: {props.name}</h2>
      <h3>{props.degree}</h3>
      <div>
        {descriptionElem}
      </div>
    </div>
  )
};

export default Education;