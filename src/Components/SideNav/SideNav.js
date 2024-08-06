import React, { useState } from 'react';
import './SideNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassEnd, faExclamationTriangle, faListCheck, faBars, faCalendarXmark,  } from '@fortawesome/free-solid-svg-icons';

function SideNav({ filter, setFilter }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''}`}>
      <a
        className="menuToggle"
        onClick={toggleNav}
      >
        <FontAwesomeIcon icon={faBars} className="icon" />
        {!isCollapsed && <span>Menu</span>}
      </a>
      <hr />
      <a
        href="#all"
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        <FontAwesomeIcon icon={faListCheck} className="icon" />
        {!isCollapsed && <span>All</span>}
      </a>
      <a
        href="#pending"
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => setFilter('pending')}
      >
        <FontAwesomeIcon icon={faHourglassEnd} className="icon" />
        {!isCollapsed && <span>Pending</span>}
      </a>
      <a
        href="#completed"
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        <FontAwesomeIcon icon={faCheck} className="icon" />
        {!isCollapsed && <span>Completed</span>}
      </a>
      <a
        href="#late"
        className={filter === 'late' ? 'active' : ''}
        onClick={() => setFilter('late')}
      >
        <FontAwesomeIcon icon={faCalendarXmark} className="icon" />
        {!isCollapsed && <span>Late</span>}
      </a>
      <a
        href="#missing"
        className={filter === 'missing' ? 'active' : ''}
        onClick={() => setFilter('missing')}
      >
        <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
        {!isCollapsed && <span>Missing</span>}
      </a>
    </div>
  );
}

export default SideNav;