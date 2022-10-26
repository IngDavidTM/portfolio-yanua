import React, { useState } from 'react';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';

const Main = () => {
  const [image, setImage] = useState(1);
  const [pop, setPop] = useState('empty');

  const appear = () => {
    document.getElementById('scroll-img').classList.remove('scroll-img');
    void document.getElementById('scroll-img').offsetWidth;
    document.getElementById('scroll-img').classList.add('scroll-img');
  };

  const clickHandlerRight = () => {
    setImage((image === 4)? 1 : image+1);
    appear();
  };

  const clickHandlerLeft = () => {
    setImage((image === 1)? 4 : image-1);
    appear();
  };

  const clickHandler = () => {
    setPop('links-section');
  }

  const clickHandlerX = () => {
    setPop('empty');
  }

  return(
    <section id='main'>
      <nav>
        <div className='nav-mobile'>
          <img className='logo-nav' src={dna} alt='logo'/>
          <p>Yanua Portfolio</p>
          <div className='hamburguer-nav' onClick={clickHandler}><i className='fa-solid fa-bars'></i></div>
        </div>
        <div className='popup-mobile'>
          <ul className={pop}>
            <li className='x-mobile' onClick={clickHandlerX}>close[x]</li>
            <li>Education <i class="fa-solid fa-school"></i></li>
            <li>Experience <i class="fa-solid fa-glasses"></i></li>
            <li>Publications <i class="fa-solid fa-sheet-plastic"></i></li>
            <li>Contributions <i class="fa-solid fa-handshake-angle"></i></li>
            <li>References <i class="fa-solid fa-magnifying-glass"></i></li>
            <li>Contact Me <i class="fa-solid fa-envelopes-bulk"></i></li>
          </ul>
        </div>
      </nav>
      <div className='presentation'>
        <h1>YANUA G. LEDESMA BRAVO</h1>
        <p>Science has allowed me to understand how life works around me and has introduced me to the investigation of new fields. I am passionate about discovering new problems and finding solutions. I am a leader, persistent, curious, and focused on issues related to public and animal health. My aspirations are the application of knowledge, with biotechnological tools, in search of common wellness.</p>
        <div className='scroll-div'>
          <img className='scroll-img' id='scroll-img' src={require(`../images/scroll${image}.jpg`)} alt='change'/>
          <button className='angle-right' onClick={clickHandlerRight}><i className='fa-solid fa-angle-right'></i></button>
          <button className='angle-left' onClick={clickHandlerLeft}><i className='fa-solid fa-thin fa-angle-left'></i></button>
        </div>
      </div>
    </section>
  );
};

export default Main;