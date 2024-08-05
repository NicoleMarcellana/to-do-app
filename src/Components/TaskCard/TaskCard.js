import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import './TaskCard.css';

function TaskCard({ task, onComplete, onEdit, onDelete, onClick }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`} onClick={() => onClick(task)}>
      <div className="task-title">{task.title}</div>
      <div className="task-details">{task.description}</div>
      <div className="task-date-time">
      <div className="task-date">{task.date}</div>
        {task.dueDate && (
          <div className="task-due">
            Due: {new Date(task.dueDate).toLocaleDateString()}
            {task.dueTime ? `, ${task.dueTime}` : ''}
          </div>
        )}
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