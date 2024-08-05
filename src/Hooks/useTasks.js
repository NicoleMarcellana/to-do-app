import { useState, useEffect } from 'react';

const getLocalStorageTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function useTasks() {
  const [tasks, setTasks] = useState(getLocalStorageTasks());
  const [areAllTasksDone, setAreAllTasksDone] = useState(
    tasks.length > 0 && tasks.every(task => task.completed)
  );

  useEffect(() => {
    setAreAllTasksDone(tasks.length > 0 && tasks.every(task => task.completed));
  }, [tasks]);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  
  const deleteTask = (taskToDelete) => setTasks(tasks.filter(task => task.id !== taskToDelete.id));
  const deleteAllTasks = () => setTasks([]);
  const completeTask = (taskToComplete) => updateTask({ ...taskToComplete, completed: !taskToComplete.completed });
  const setAllTasksDone = (done) => setTasks(tasks.map(task => ({ ...task, completed: done })));

  return {
    tasks,
    areAllTasksDone,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    deleteAllTasks,
    setAllTasksDone
  };
}