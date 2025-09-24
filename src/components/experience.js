import React from 'react';
import '../stylesheets/experience.css';

const Experience = (props) => {
  const calculateDuration = (from, to) => {
    if (to === 'Present') return 'Ongoing';

    const startDate = new Date(from);
    const endDate = new Date(to);

    // Calculate difference in months
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Convert to months (approximately 30 days per month)
    const totalMonths = Math.floor(diffDays / 30);

    if (totalMonths >= 12) {
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;

      if (remainingMonths === 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      } else {
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
      }
    } else if (totalMonths > 0) {
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
  };

  const formatPeriod = (from, to) => {
    if (to === 'Present') {
      return `${from} - Present`;
    }
    return `${from} - ${to}`;
  };

  return (
    <div className='experience-div'>
      {/* Header with period and duration */}
      <div className='experience-header'>
        <div className='experience-period'>
          {formatPeriod(props.from, props.to)}
        </div>
        <div className='experience-duration-badge'>
          <span className='duration-icon'>⏱</span>
          <span>{calculateDuration(props.from, props.to)}</span>
        </div>
      </div>

      {/* Content */}
      <div className='experience-content'>
        <h3 className='experience-title'>{props.title}</h3>
        <p className='experience-description'>{props.description}</p>
      </div>
    </div>
  );
};

export default Experience;