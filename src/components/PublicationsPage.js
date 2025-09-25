import React from 'react';
import '../stylesheets/mainPage.css';
import '../stylesheets/publications.css';
import Layout from './Layout';
import publicationsData from '../data/publications.json';

const PublicationsPage = () => {
  const copyToClipboard = (doi) => {
    navigator.clipboard.writeText(doi);
  };

  return (
    <div className='publications-page'>
      <Layout active='publications' showBackLink>
        <div className='publications-hero'>
          <h1 className='publications-hero-title'>Publications</h1>
          <div className='publications-hero-line'></div>
          <p className='publications-hero-subtitle'>
            My research contributions and scientific publications
          </p>
        </div>

        <div className='publications-content'>
          <div className='publications-grid'>
            {publicationsData.map((publication) => (
              <div key={publication.id} className='publication-card-horizontal'>
                <div className='publication-cover'>
                  <div className='publication-cover-text'>
                    <div className='journal-icon-large'>📄</div>
                    <div className='publication-year-badge'>{publication.year}</div>
                    <div className='cover-title'>{publication.journal}</div>
                    <div className='cover-subtitle'>Scientific Journal</div>
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
                          {index === publication.authors.length - 2 && ' and '}
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
                      Read Paper
                    </a>
                    <a
                      href={publication.links.pubmed}
                      target='_blank'
                      rel='noreferrer'
                      className='action-btn secondary'
                    >
                      PubMed
                    </a>
                    <button
                      className='action-btn tertiary'
                      onClick={() => copyToClipboard(publication.doi)}
                    >
                      <span>📋</span>
                      Copy DOI
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
