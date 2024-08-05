import React from 'react';
import './TaskDetailsModal.css';

function TaskDetailsModal({ task, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="task-details-modal-overlay">
      <div className="task-details-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="task-title1">{task.title}</h2>
        <p className="task-details1">{task.description}</p>
        <div className="due">
          {task.dueDate && (
            <p className="task-due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
              {task.dueTime ? `, ${task.dueTime}` : ''}
            </p>
          )}
        </div>
        <p className="task-date1">{task.date}</p> 
      </div>
    </div>
  );
}

export default TaskDetailsModal;