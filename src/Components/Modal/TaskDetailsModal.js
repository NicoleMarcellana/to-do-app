import React from 'react';
import './TaskDetailsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock} from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '../../Utils/DateUtils';

function TaskDetailsModal({ task, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="task-details-modal-overlay">
      <div className="task-details-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="task-title1">{task.title}</h2>
        <p className="task-details1">{task.description}</p>
        <div className="due">
            {task.dueDate && 
              <div className="date">
                <FontAwesomeIcon icon={faCalendar} /> 
                {formatDate(task.dueDate)}
              </div>}
            {task.dueTime && 
              <div className="time">
                <FontAwesomeIcon icon={faClock} /> 
                {formatTime(task.dueTime)}
              </div>}
          </div>
        <p className="task-date1">{task.date}</p> 
      </div>
    </div>
  );
}

export default TaskDetailsModal;