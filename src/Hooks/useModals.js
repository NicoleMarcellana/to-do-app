import { useState } from 'react';

export function useModals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDetailsModal = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const openConfirmDelete = (task) => {
    setTaskToDelete(task);
    setIsConfirmDeleteOpen(true);
  };
  const closeConfirmDelete = () => setIsConfirmDeleteOpen(false);

  return {
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
  };
}