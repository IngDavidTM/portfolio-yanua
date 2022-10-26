import React from 'react';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';
import scroll from '../images/scroll1.jpg';

const Main = () => {
  return(
    <section id='main'>
      <nav>
        <div className='nav-mobile'>
          <img className='logo-nav' src={dna} alt='logo'/>
          <p>Yanua Portfolio</p>
          <div className='hamburguer-nav'><i className='fa-solid fa-bars'></i></div>
        </div>
        <div className='popup-mobile'>
            <ul className='links-section'>
            <li className='x-mobile'>x</li>
            <li>Education</li>
            <li>Experience</li>
            <li>Publications</li>
            <li>Contributions</li>
            <li>References</li>
            <li>Contact Me</li>
          </ul>
        </div>
      </nav>
      <div className='presentation'>
        <h1>YANUA G. LEDESMA BRAVO</h1>
        <p>Science has allowed me to understand how life works around me and has introduced me to the investigation of new fields. I am passionate about discovering new problems and finding solutions. I am a leader, persistent, curious, and focused on issues related to public and animal health. My aspirations are the application of knowledge, with biotechnological tools, in search of common wellness.</p>
        <img className='scroll-img' src={scroll} alt='change'/>
      </div>
    </section>
  );
};

export default Main;