import React from 'react';
import '../stylesheets/experience.css';

const Experience = (props) => {
  // Parse a "Month YYYY" string in a Safari‑safe way
  const parseMonthYear = (str) => {
    if (!str || typeof str !== 'string') return null;
    const months = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const parts = str.trim().split(/\s+/);
    if (parts.length !== 2) return null;
    const month = months[parts[0].toLowerCase()];
    const year = parseInt(parts[1], 10);
    if (month === undefined || Number.isNaN(year)) return null;
    return { year, month };
  };

  const calculateDuration = (from, to) => {
    if (to === 'Present') return 'Ongoing';

    const start = parseMonthYear(from);
    const end = parseMonthYear(to);

    if (!start || !end) return '';

    // Exact month difference (cross‑browser, timezone‑safe)
    const totalMonths = (end.year - start.year) * 12 + (end.month - start.month);

    if (totalMonths >= 12) {
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;

      if (remainingMonths === 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      }
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }

    if (totalMonths > 0) {
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    }

    // If within the same month, show 0 months
    return '0 months';
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
