export const filterTasks = (tasks, filter) => {
  const now = new Date();

  const getTaskDueDateTime = (task) => {
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':').map(Number);
        dueDate.setHours(hours, minutes);
      }
      return dueDate;
    }
    return null;
  };

  switch (filter) {
    case 'all':
      return tasks;
    case 'pending':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'late':
      return tasks.filter(task => 
        task.completed && 
        getTaskDueDateTime(task) && 
        getTaskDueDateTime(task) < now
      );
    case 'missing':
      return tasks.filter(task => 
        !task.completed &&
        getTaskDueDateTime(task) && 
        getTaskDueDateTime(task) <= now
      );
    default:
      return tasks;
  }
};

export const createNewTask = (title, description, dueDate, dueTime) => {
  const now = new Date();
  const defaultDueDate = dueTime ? now.toISOString().split('T')[0] : dueDate;
  return {
    id: Date.now(),
    title,
    description,
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    completed: false,
    dueDate: defaultDueDate,
    dueTime
  };
};