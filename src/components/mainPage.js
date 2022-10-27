import React, { useState } from 'react';
import '../stylesheets/mainPage.css';
import dna from '../images/dna.png';
import Education from './education';
import Experience from './experience';

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
    <div>
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
              <a href='#education' onClick={clickHandlerX}>Education <i class="fa-solid fa-school"></i></a>
              <a href='#experience' onClick={clickHandlerX}>Experience <i class="fa-solid fa-glasses"></i></a>
              <a href='#education' onClick={clickHandlerX}>Publications <i class="fa-solid fa-sheet-plastic"></i></a>
              <a href='#education' onClick={clickHandlerX}>Contributions <i class="fa-solid fa-handshake-angle"></i></a>
              <a href='#education' onClick={clickHandlerX}>References <i class="fa-solid fa-magnifying-glass"></i></a>
              <a href='#education' onClick={clickHandlerX}>Contact Me <i class="fa-solid fa-envelopes-bulk"></i></a>
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
      <section className='education' id='education'>
        <h2 className='h2-section'>Education</h2>
        <Education 
        image='udla.jpg' 
        href='https://www.udla.edu.ec/' 
        name='University of the Americas (UDLA)' 
        degree='Degree in Biotechnology' 
        year='2022' 
        description={['Biotechnology Engineer', 'Senescyt register: 1040-2022-2444386']}
        />
      </section>
      <section className='experience' id='experience'>
        <h2 className='h2-section'>Professional and research experience</h2>
        <Experience 
        from='January 2020' 
        to='March 2020' 
        title='Pre-professional practices in the University of the Americas Research Laboratories' 
        description='Isolation and microbiological and biochemical identification of colisstin resistant bacteria using microbiology and molecular biology. Quito, Ecuador' 
        hours={166}
        />
        <p><i className='fa-solid fa-chevron-down'></i></p>
        <Experience 
        from='January 2021' 
        to='September 2021' 
        title='Pre-professional practices in Zoonosis Research Institute - C.I.Z Laboratories from the Central University of Ecuador' 
        description='Immunological diagnosis of diseases such as neospora, Q-fever and prototheca. Culture and molecular identification of prototheca, tuberculous and environmental mycobacteria. Quito, Ecuador' 
        hours={504}
        />
        <p><i className='fa-solid fa-chevron-down'></i></p>
        <Experience 
        from='January 2021' 
        to='February 2022' 
        title='Pre-professional practices in the University of the Americas Research Laboratories' 
        description='Molecular, bioinformatic and cladistic identification of non-tuberculos mycobacteria isolated from patients from Venezuela. Quito, Ecuador' 
        hours={433}
        />
        <p><i className='fa-solid fa-chevron-down'></i></p>
        <Experience 
        from='Febrary 2022' 
        to='Present' 
        title='Professional practices in the University of the Americas Research Laboratories' 
        description="Molecular and bioinformatic orchid's identification from Ecuadorian Andes and Amazon. Cattle genotyping. Quito, Ecuador" 
        hours={'...'}
        />
      </section>
    </div>
  );
};

export default Main;