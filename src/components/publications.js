import React from 'react';
import '../stylesheets/publications.css';

const Publications = (props) => {
  const copy = (index) => {
    document.getElementById(`doi${props.num}`).select();
    document.execCommand('copy');
  };

  return(
    <div className='publications-div'>
      <img alt='paper' src={require(`../images/${props.image}.png`)}/>
      <div className='links-paper'>
        <a href={`${props.link}`} target='_blank' rel='noreferrer'><i className='fa-solid fa-link'></i></a>
        <a href={`${props.pub}`} target='_blank' rel='noreferrer'>PubMed</a>
        <div>
          <input type='text' id={`doi${props.num}`} value={props.doi} readOnly />
          <button className='copy' onClick={copy}>Copy</button>
        </div>
      </div>
    </div>
  )
};

export default Publications;