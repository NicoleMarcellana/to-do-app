import { formatDate } from './DateUtils';

export const filterTasks = (tasks, filter) => {
  const now = new Date();

  switch (filter) {
    case 'all':
      return tasks;
    case 'pending':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'late':
      return tasks.filter(task => task.completed && task.dueDate && new Date(task.dueDate) < now);
    case 'missing':
      return tasks.filter(task => !task.completed && task.dueDate && new Date(task.dueDate) <= now);
    default:
      return tasks;
  }
};

export const createNewTask = (title, description, dueDate, dueTime) => {
  const creationDate = new Date();
  return {
    id: Date.now(),
    title,
    description,
    date: formatDate(creationDate),
    completed: false,
    dueDate: dueDate ? formatDate(dueDate) : (dueTime ? formatDate(creationDate) : null),
    dueTime: dueTime || null
  };
};