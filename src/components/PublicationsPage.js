import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/publications.css';
import Layout from './Layout';
import publicationsData from '../data/publications.json';
import { useLanguage } from '../context/LanguageContext';

const PublicationsPage = () => {
  const { language } = useLanguage();
  const copy = {
    en: {
      title: 'Publications',
      subtitle: 'My research contributions and scientific publications',
      journalLabel: 'Scientific Journal',
      readPaper: 'Read Paper',
      pubmed: 'PubMed',
      copyDoi: 'Copy DOI',
      copied: 'DOI copied!',
      andWord: ' and ',
    },
    es: {
      title: 'Publicaciones',
      subtitle: 'Mis contribuciones de investigación y publicaciones científicas',
      journalLabel: 'Revista científica',
      readPaper: 'Leer artículo',
      pubmed: 'PubMed',
      copyDoi: 'Copiar DOI',
      copied: '¡DOI copiado!',
      andWord: ' y ',
    },
  };

  const texts = copy[language] || copy.en;

  const copyToClipboard = (doi) => {
    navigator.clipboard.writeText(doi);
  };

  // Sort publications by most recent year first
  const sortedPublications = [...publicationsData].sort((a, b) => (b.year || 0) - (a.year || 0));

  return (
    <div className='publications-page'>
      <Layout active='publications' showBackLink>
        <div className='publications-hero'>
          <h1 className='publications-hero-title'>{texts.title}</h1>
          <div className='publications-hero-line'></div>
          <p className='publications-hero-subtitle'>{texts.subtitle}</p>
        </div>

        <div className='publications-content'>
          <div className='publications-grid'>
            {sortedPublications.map((publication) => (
              <div key={publication.id} className='publication-card-horizontal'>
                <div className='publication-cover'>
                    <div className='publication-cover-text'>
                      <div className='journal-icon-large'>📄</div>
                      <div className='publication-year-badge'>{publication.year}</div>
                      <div className='cover-title'>{publication.journal}</div>
                      <div className='cover-subtitle'>{texts.journalLabel}</div>
                    </div>
                  </div>

                  <div className='publication-details'>
                  <div className='publication-header-info'>
                    <div className='publication-journal-horizontal'>
                      <span className='journal-badge'>{publication.journal}</span>
                      <span className='publisher-badge'>{publication.publisher}</span>
                    </div>
                  </div>

                  <h3 className='publication-title-horizontal'>
                    {publication.title}
                  </h3>

                    <div className='publication-authors-horizontal'>
                      <div className='authors-list'>
                        {publication.authors.map((author, index) => (
                          <React.Fragment key={index}>
                            {author === 'Yanua Ledesma' || author === 'Yanua Ledesma-Bravo' ?
                              <span className='lead-author'>{author}</span> :
                              author
                            }
                            <sup>{publication.affiliations[index]}</sup>
                            {index < publication.authors.length - 1 && ', '}
                            {index === publication.authors.length - 2 && texts.andWord}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                  <div className='publication-abstract'>
                    <p className='abstract-text'>
                      {publication.abstract}
                    </p>
                  </div>

                    <div className='publication-actions-horizontal'>
                      <a
                        href={publication.links.article}
                        target='_blank'
                        rel='noreferrer'
                        className='action-btn primary'
                      >
                        <span>📄</span>
                        {texts.readPaper}
                      </a>
                      <a
                        href={publication.links.pubmed}
                        target='_blank'
                        rel='noreferrer'
                        className='action-btn secondary'
                      >
                        {texts.pubmed}
                      </a>
                      <button
                        className='action-btn tertiary'
                        onClick={() => copyToClipboard(publication.doi)}
                      >
                        <span>📋</span>
                        {texts.copyDoi}
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PublicationsPage;
