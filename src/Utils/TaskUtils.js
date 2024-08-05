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
      return tasks.filter(task => task.completed && new Date(task.dueDate) < now);
    case 'missing':
      return tasks.filter(task => !task.completed && new Date(task.dueDate) <= now);
    default:
      return tasks;
  }
};

export const createNewTask = (title, description, dueDate, dueTime) => ({
  id: Date.now(),
  title,
  description,
  date: formatDate(new Date()),
  completed: false,
  dueDate: dueDate ? formatDate(dueDate) : null,
  dueTime: dueTime || null
});