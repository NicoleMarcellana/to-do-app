import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheck, faClock, faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import './TaskCard.css';
import { formatDate, formatTime } from '../../Utils/DateUtils';

function TaskCard({ task, onComplete, onEdit, onDelete, onClick }) {
  const now = new Date();

  const getStatusClass = () => {
    if (task.completed && task.dueDate && new Date(task.dueDate) < now) return 'status-late';
    if (task.completed) return 'status-completed';
    if (!task.completed && task.dueDate && new Date(task.dueDate) <= now) return 'status-missing';
    return 'status-pending';
  };

  const getStatusText = () => {
    if (task.completed && task.dueDate && new Date(task.dueDate) < now) return 'Late';
    if (task.completed) return 'Completed';
    if (!task.completed && task.dueDate && new Date(task.dueDate) <= now) return 'Missing';
    return 'Pending';
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`} onClick={() => onClick(task)}>
      <div className={`status-text ${getStatusClass()}`}>{getStatusText()}</div>
      <div className="task-title">{task.title}</div>
      <div className="task-details">{task.description}</div>
      <div className="task-date-time">
        <div className="task-date">{formatDate(task.date)}</div>
        <div className="task-due">
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
      </div>
      <div className="task-buttons">
        <button className="complete-button" onClick={(e) => { e.stopPropagation(); onComplete(task); }}>
          <FontAwesomeIcon icon={task.completed ? faUndo : faCheck} />
        </button>
        <button className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(task); }}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
