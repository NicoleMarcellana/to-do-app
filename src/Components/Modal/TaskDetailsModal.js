import React from 'react';
import './TaskDetailsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '../../Utils/DateUtils';

function TaskDetailsModal({ task, isOpen, onClose }) {
  const now = new Date();

  const getTaskDueDateTime = () => {
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':').map(Number);
        dueDate.setHours(hours, minutes);
      }
      return dueDate;
    }
    return null;
  };

  const getStatusClass = () => {
    const dueDateTime = getTaskDueDateTime();
    if (task.completed) {
      return dueDateTime && dueDateTime < now ? 'status-late' : 'status-completed';
    }
    if (dueDateTime && dueDateTime < now) {
      return 'status-missing';
    }
    return 'status-pending';
  };

  const getStatusText = () => {
    const dueDateTime = getTaskDueDateTime();
    if (task.completed) {
      return dueDateTime && dueDateTime < now ? 'Late' : 'Completed';
    }
    if (dueDateTime && dueDateTime < now) {
      return 'Missing';
    }
    return 'Pending';
  };

  if (!isOpen) return null;

  return (
    <div className="task-details-modal-overlay">
      <div className="task-details-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <div className={`task-content ${task.completed ? 'completed' : ''}`}>
        <div className={`status-text ${getStatusClass()}`}>{getStatusText()}</div>
          <h2 className="task-title1">{task.title}</h2>
          <p className="task-details1">{task.description}</p>
          <div className="due">
            {task.dueDate && (
              <div className="date">
                <FontAwesomeIcon icon={faCalendar} /> 
                {formatDate(task.dueDate)}
              </div>
            )}
            {task.dueTime && (
              <div className="time">
                <FontAwesomeIcon icon={faClock} /> 
                {formatTime(task.dueTime)}
              </div>
            )}
          </div>
          <p className="task-date1">{formatDate(task.date)}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;