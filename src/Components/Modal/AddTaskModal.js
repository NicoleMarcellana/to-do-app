import React, { useState, useEffect } from 'react';
import './AddTaskModal.css';

function AddTaskModal({ isOpen, onClose, onSave, taskTitle, setTaskTitle, taskDescription, setTaskDescription, dueDate, setDueDate, dueTime, setDueTime, mode }) {
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTouched(false); 
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSaveClick = () => {
    setIsTouched(true);
    if (taskTitle.trim()) {
      onSave(taskTitle, taskDescription, dueDate, dueTime);
      resetFields();
    }
  };

  const handleCancelClick = () => {
    resetFields();
    onClose();
  };

  const resetFields = () => {
    setTaskTitle('');
    setTaskDescription('');
    setDueDate('');
    setDueTime('');
    setIsTouched(false);
  };

  const titleError = !taskTitle.trim() && isTouched ? 'Task title is required' : '';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === 'edit' ? 'Edit Task' : 'Add Task'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={() => setIsTouched(true)}
          />
        </label>
        {titleError && <p className="error-message">{titleError}</p>}
        <label>
          Details:
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          Due Time:
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button
            onClick={handleSaveClick}
            disabled={!!titleError}
            className={titleError ? 'error-button' : ''}
          >
            {titleError ? 'Title is required' : 'Save'}
          </button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;