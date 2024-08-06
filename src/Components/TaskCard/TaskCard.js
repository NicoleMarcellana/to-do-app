import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheck, faClock, faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import './TaskCard.css';
import { formatDate, formatTime } from '../../Utils/DateUtils';

function TaskCard({ task, onComplete, onEdit, onDelete, onClick }) {
  const now = new Date();

  const getTaskDueDateTime = () => {
    const date = task.dueDate || new Date().toISOString().split('T')[0]; // Default to current date if no due date
    const time = task.dueTime || '23:59'; // Default to 11:59 PM if no due time
    const dueDateTime = new Date(`${date}T${time}:00`);
    return dueDateTime;
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
