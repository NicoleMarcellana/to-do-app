import { createNewTask } from './TaskUtils';

export const handleSaveTask = (taskTitle, taskDescription, dueDate, dueTime, editingTask, addTask, updateTask, closeModal, resetFields) => {
  if (!taskTitle.trim()) return;

  if (editingTask) {
    updateTask({ ...editingTask, title: taskTitle, description: taskDescription, dueDate, dueTime });
  } else {
    const newTask = createNewTask(taskTitle, taskDescription, dueDate, dueTime);
    addTask(newTask);
  }
  closeModal();
  resetFields();
};

export const handleCompleteTask = (taskToComplete, completeTask) => completeTask(taskToComplete);

export const handleEditTask = (taskToEdit, setTaskTitle, setTaskDescription, setDueDate, setDueTime, setEditingTask, openModal) => {
  setTaskTitle(taskToEdit.title);
  setTaskDescription(taskToEdit.description);
  setDueDate(taskToEdit.dueDate || ''); 
  setDueTime(taskToEdit.dueTime || ''); 
  setEditingTask(taskToEdit);
  openModal();
};

export const handleDeleteTask = (taskToDelete, openConfirmDelete) => openConfirmDelete(taskToDelete);
export const confirmDeleteSingleTask = (taskToDelete, deleteTask, closeConfirmDelete) => {
  if (taskToDelete) deleteTask(taskToDelete);
  closeConfirmDelete();
};
export const handleDeleteAll = (tasks, openConfirmDelete) => {
  if (tasks.length > 0) openConfirmDelete(null);
};
export const confirmDeleteAll = (deleteAllTasks, closeConfirmDelete) => {
  deleteAllTasks();
  closeConfirmDelete();
};
export const handleDoneAll = (tasks, areAllTasksDone, setAllTasksDone) => {
  if (tasks.length > 0 && !areAllTasksDone) setAllTasksDone(true);
};
export const handleUndoneAll = (setAllTasksDone) => setAllTasksDone(false);