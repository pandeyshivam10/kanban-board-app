import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onEdit, onDelete }) => {
  const handleMoveToDoing = (task) => {
    const updatedTask = { ...task, status: 'Doing' };
    onEdit(updatedTask);
  };

  const handleMoveToDone = (task) => {
    const updatedTask = { ...task, status: 'Done' };
    onEdit(updatedTask);
  };

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h2 className="kanban-title">To Do</h2>
        {tasks
          .filter(task => task.status === 'To Do')
          .map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onMoveToDoing={() => handleMoveToDoing(task)}
              onMoveToDone={() => handleMoveToDone(task)}
            />
          ))}
      </div>
      <div className="kanban-column">
        <h2 className="kanban-title">Doing</h2>
        {tasks
          .filter(task => task.status === 'Doing')
          .map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onMoveToDoing={() => handleMoveToDoing(task)}
              onMoveToDone={() => handleMoveToDone(task)}
            />
          ))}
      </div>
      <div className="kanban-column">
        <h2 className="kanban-title">Done</h2>
        {tasks
          .filter(task => task.status === 'Done')
          .map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onMoveToDoing={() => handleMoveToDoing(task)}
              onMoveToDone={() => handleMoveToDone(task)}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
