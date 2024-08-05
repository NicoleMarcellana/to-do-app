import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SideNav from './Components/SideNav/SideNav';
import MainBoard from './Components/MainBoard/MainBoard';
import AddTaskModal from './Components/Modal/AddTaskModal';
import TaskDetailsModal from './Components/Modal/TaskDetailsModal';
import ConfirmDeleteModal from './Components/Modal/ConfirmDeleteModal';
import { useTasks } from './Hooks/useTasks';
import { useModals } from './Hooks/useModals';
import { filterTasks } from './Utils/TaskUtils';
import * as TaskHandlers from './Utils/TaskHandlers';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const {
    tasks,
    areAllTasksDone,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    deleteAllTasks,
    setAllTasksDone
  } = useTasks();

  const {
    isModalOpen,
    isDetailsModalOpen,
    isConfirmDeleteOpen,
    selectedTask,
    taskToDelete,
    openModal,
    closeModal,
    openDetailsModal,
    closeDetailsModal,
    openConfirmDelete,
    closeConfirmDelete
  } = useModals();

  const handleCancelClick = () => {
    resetFields();
    closeModal();
  };

  const resetFields = () => {
    setTaskTitle('');
    setTaskDescription('');
    setDueDate('');
    setDueTime('');
    setIsTouched(false);
    setEditingTask(null);
  };

  const titleError = !taskTitle.trim() && isTouched ? 'Task title is required.' : '';

  return (
    <div className="App">
      <Header />
      <div className="content">
        <SideNav filter={filter} setFilter={setFilter} />
        <MainBoard
          tasks={filterTasks(tasks, filter)}
          areAllTasksDone={areAllTasksDone}
          handleCompleteTask={(task) => TaskHandlers.handleCompleteTask(task, completeTask)}
          handleEditTask={(task) => TaskHandlers.handleEditTask(task, setTaskTitle, setTaskDescription, setDueDate, setDueTime, setEditingTask, openModal)}
          handleDeleteTask={(task) => TaskHandlers.handleDeleteTask(task, openConfirmDelete)}
          handleDoneAll={() => TaskHandlers.handleDoneAll(tasks, areAllTasksDone, setAllTasksDone)}
          handleUndoneAll={() => TaskHandlers.handleUndoneAll(setAllTasksDone)}
          handleDeleteAll={() => TaskHandlers.handleDeleteAll(tasks, openConfirmDelete)}
          openModal={openModal}
          openDetailsModal={openDetailsModal}
        />
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCancelClick}
        onSave={() => TaskHandlers.handleSaveTask(taskTitle, taskDescription, dueDate, dueTime, editingTask, addTask, updateTask, closeModal, resetFields)}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        dueTime={dueTime}
        setDueTime={setDueTime}
        titleError={titleError}
        mode={editingTask ? 'edit' : 'add'}
      />
      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        task={selectedTask}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={closeConfirmDelete}
        onConfirm={() => taskToDelete 
          ? TaskHandlers.confirmDeleteSingleTask(taskToDelete, deleteTask, closeConfirmDelete) 
          : TaskHandlers.confirmDeleteAll(deleteAllTasks, closeConfirmDelete)}
        task={taskToDelete}
      />
    </div>
  );
};

export default App;