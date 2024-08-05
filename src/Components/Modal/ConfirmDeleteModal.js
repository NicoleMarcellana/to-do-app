import React from 'react';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, task }) {
  if (!isOpen) return null;

  const isSingleTask = !!task;
  const message = isSingleTask 
    ? `Are you sure you want to delete the task "${task.title}"?`
    : `Are you sure you want to delete all tasks?`;

  return (
    <div className="confirm-delete-modal-overlay">
      <div className="confirm-delete-modal">
        <h2>Confirm Deletion</h2>
        <p>{message}</p>
        <p className="subheading">This action cannot be undone.</p>
        <div className="button-container">
          <button className="confirm-button" onClick={() => { onConfirm(); onClose(); }}>
            Yes, Delete
          </button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;