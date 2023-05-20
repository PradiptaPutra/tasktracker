import React from 'react';
import './index.css';

const TaskItem = ({ task, onDelete, onComplete, onEdit, deadline }) => {
  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const handleCompleteClick = () => {
    onComplete(task.id);
  };

  const isDeadlineNear = () => {
    const today = new Date();
    const taskDeadline = new Date(task.deadline);
    const timeDiff = taskDeadline.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff < 1) {
      return true;
    } else {
      return false;
    }
  };

  const isDeadlineFar = () => {
    const today = new Date();
    const taskDeadline = new Date(task.deadline);
    const timeDiff = taskDeadline.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
  
    if (dayDiff > 7) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${isDeadlineNear() ? 'alert-danger' : ''}  ${isDeadlineFar() ? 'alert-far' : ''} ` }>
      <div className={`task-title ${task.completed ? 'completed' : ''} `}  onClick={handleCompleteClick}>
        <div><p>Task Name :</p> </div>
        {task.title}
      </div>
      <div className="task-details">
        <div><p>Task Description :</p></div>
        <div>{task.description}</div>
        <div><p>Deadline :</p></div>
        <div>{task.deadline}</div>
        {task.file && (
          <div>
            <p>File:</p>
            <a href={task.file} target="_blank" rel="noopener noreferrer">Download File</a>
          </div>
        )}
      </div>
      <div>
        {!task.completed && (
          <button type="button" className="btn btn-success" onClick={handleCompleteClick}>
            Done
          </button>
        )}
        <button type="button" className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
