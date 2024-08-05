import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './MainBoard.css';

const MainBoard = ({
  tasks,
  areAllTasksDone,
  handleCompleteTask,
  handleEditTask,
  handleDeleteTask,
  handleDoneAll,
  handleUndoneAll,
  handleDeleteAll,
  openModal,
  openDetailsModal
}) => {
  const handleTaskClick = (task) => {
    openDetailsModal(task); 
  };

  return (
    <div className="main">
      <div className="main-header">
        <h2 className="title">To-do List</h2>
        <button className="add-task-button" onClick={openModal}>Add Task</button>
      </div>
      <div className="task-container">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onClick={handleTaskClick}
          />
        ))}
      </div>
      <div className="task-actions">
        <button
          className="done-all-button"
          onClick={areAllTasksDone ? handleUndoneAll : handleDoneAll}
        >
          {areAllTasksDone ? 'Undone All' : 'Done All'}
        </button>
        <button className="delete-all-button" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>
    </div>
  );
}

export default MainBoard;