import React, { useState } from "react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onMoveToDoing,
  onMoveToDone,
  onDragStart,
  onDragEnd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="task-input"
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="task-input"
          />
          <button
            onClick={handleSaveClick}
            className="task-button task-button-save"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="task-button task-button-cancel"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="task-view">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <div className="task-buttons">
            <button
              onClick={handleEditClick}
              className="task-button task-button-edit"
            >
              Edit
            </button>

            <button
              onClick={onDelete}
              className="task-button task-button-delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
