import React from 'react';
import TaskCard from './TaskCard';
const TaskColumn = ({ title, tasks, onEdit, onDelete }) => {
  return (
    <div className="task-column">
      <h2 className="column-title">{title}</h2>
      <div className="column-tasks">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
