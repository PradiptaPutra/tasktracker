import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './index.css';
import { BsFileText } from 'react-icons/bs';

const SearchTasks = ({ searchTerm, handleSearchTermChange }) => {
  return (
    <div>
      <h3>Search Tasks :</h3>
      <div className="form-group">
        <input type="text" id="searchTerm" className="form-control" value={searchTerm} onChange={handleSearchTermChange} />
      </div>
    </div>
  );
};

const RemainingTasks = ({ remainingTasks, onTaskDelete, onTaskComplete, onTaskEdit }) => {
  return (
    <div>
      <h3>Tasks to complete</h3>
      {remainingTasks.length === 0 && <div className="alert alert-success">Congratulations, there are no tasks to complete!</div>}
      <ul className="list-group">
        {remainingTasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={onTaskDelete} onComplete={onTaskComplete} onEdit={onTaskEdit} />
        ))}
      </ul>
    </div>
  );
};

const CompletedTasks = ({ completedTasks, onTaskDelete, onTaskComplete, onTaskEdit }) => {
  return (
    <div>
      <h3>Completed tasks</h3>
      {completedTasks.length === 0 && <div className="alert alert-warning">No tasks have been completed yet</div>}
      <ul className="list-group">
        {completedTasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={onTaskDelete} onComplete={onTaskComplete} onEdit={onTaskEdit} />
        ))}
      </ul>
    </div>
  );
};

const UploadedFiles = ({ tasks }) => {
  return (
    <div className="uploaded-files">
      <h3>Uploaded files:</h3>
      <ul>
        {tasks.map(task => (
          task.filename && (
            <li key={task.id}>
              Task Name: {task.title}
              <br />
              Description: {task.description}
              <br />
              Deadline: {task.deadline}
              <br />
              File: <BsFileText size={16} />{' '}
              <a className="file-link" href={`http://localhost:3000/uploads/${encodeURIComponent(task.filename)}`} target="_blank" rel="noopener noreferrer">
                {task.filename}
              </a>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};


const TaskList = ({ tasks, onTaskDelete, onTaskComplete, onTaskEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('remaining');

  const completedTasks = tasks.filter(task => task.completed && task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const remainingTasks = tasks.filter(task => !task.completed && task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  let pageContent;

  if (activePage === 'remaining') {
    pageContent = <RemainingTasks remainingTasks={remainingTasks} onTaskDelete={onTaskDelete} onTaskComplete={onTaskComplete} onTaskEdit={onTaskEdit} />;
  } else if (activePage === 'completed') {
    pageContent = <CompletedTasks completedTasks={completedTasks} onTaskDelete={onTaskDelete} onComplete={onTaskComplete} onTaskEdit={onTaskEdit} />;
  } else if (activePage === 'uploads') {
    pageContent = <UploadedFiles tasks={tasks} />;
  }

  return (
    <div>
      <nav className="navbar">
        <h2>Your Task</h2>
      </nav>
      <div className="container">
        <ul className="nav nav-pills">
          <li className={`nav-item ${activePage === 'remaining' ? 'active' : ''}`}>
            <button className="nav-link btn btn-link" onClick={() => handlePageChange('remaining')}>
            Tasks to complete
            </button>
          </li>
          <li className={`nav-item ${activePage === 'completed' ? 'active' : ''}`}>
            <button className="nav-link btn btn-link" onClick={() => handlePageChange('completed')}>
            Completed tasks
            </button>
          </li>
          <li className={`nav-item ${activePage === 'uploads' ? 'active' : ''}`}>
            <button className="nav-link btn btn-link" onClick={() => handlePageChange('uploads')}>
            Uploaded files 
            </button>
          </li>
        </ul>

        <SearchTasks searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />

        {pageContent}
      </div>
    </div>
  );
};

export default TaskList;
