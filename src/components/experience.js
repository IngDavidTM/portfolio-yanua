import React from 'react';
import '../stylesheets/experience.css';

const Experience = (props) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDuration = (hours) => {
    if (hours === '...') return 'Ongoing';

    // Base: 160 hours = 1 month (average working hours per month)
    const hoursPerMonth = 160;

    if (hours >= hoursPerMonth) {
      const totalMonths = Math.floor(hours / hoursPerMonth);

      if (totalMonths >= 12) {
        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        if (remainingMonths === 0) {
          return `${years} year${years > 1 ? 's' : ''}`;
        } else {
          return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
        }
      } else {
        return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
      }
    }

    return `${hours} hours`;
  };

  const formatPeriod = (from, to, hours) => {
    if (hours === '...') {
      return `${from} - Present`;
    }
    return `${from} - ${to}`;
  };

  return (
    <div className='experience-div'>
      {/* Header with period and duration */}
      <div className='experience-header'>
        <div className='experience-period'>
          {formatPeriod(props.from, props.to, props.hours)}
        </div>
        <div className='experience-duration-badge'>
          <span className='duration-icon'>⏱</span>
          <span>{formatDuration(props.hours)}</span>
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