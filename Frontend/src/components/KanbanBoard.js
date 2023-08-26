import React, { useState } from "react";
import TaskCard from "./TaskCard";

const KanbanBoard = ({ tasks, onEdit, onDelete }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (event, task) => {
    setDraggedTask(task);
  };

  const handleDragEnter = (event, status) => {
    if (draggedTask && draggedTask.status !== status) {
      const updatedTask = { ...draggedTask, status };
      onEdit(updatedTask);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <div className="kanban-board">
      <div
        className="kanban-column"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDragEnter(event, "To Do")}
      >
        <h2 className="kanban-title">To Do</h2>
        {tasks
          .filter((task) => task.status === "To Do")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
      </div>

      <div
        className="kanban-column"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDragEnter(event, "Doing")}
      >
        <h2 className="kanban-title">Doing</h2>
        {tasks
          .filter((task) => task.status === "Doing")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
      </div>

      <div
        className="kanban-column"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDragEnter(event, "Done")}
      >
        <h2 className="kanban-title">Done</h2>
        {tasks
          .filter((task) => task.status === "Done")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={() => onDelete(task._id)}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
