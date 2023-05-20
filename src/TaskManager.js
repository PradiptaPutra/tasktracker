import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './index.css';
import axios from 'axios';

const TaskManager = () => {
const [tasks, setTasks] = useState([]);

useEffect(() => {
fetchTasks();
}, []);

const fetchTasks = async () => {
try {
const response = await axios.get(`http://localhost:3000/tasks`);
setTasks(response.data);
} catch (error) {
console.log(error);
}
};

const handleTaskAdd = async (newTask) => {
try {
const response = await axios.post(`http://localhost:3000/tasks`, newTask);
fetchTasks();
} catch (error) {
console.log(error);
}
};

const handleTaskDelete = async (taskId) => {
try {
await axios.delete(`http://localhost:3000/tasks/${taskId}`);
fetchTasks();
} catch (error) {
console.log(error);
}
};

const handleTaskComplete = async (taskId) => {
try {
await axios.put(`http://localhost:3000/tasks/${taskId}`);
fetchTasks();
} catch (error) {
console.log(error);
}
};

return (
<div className="container">
<div className="row">
<div className="col-md-6 mx-auto">
<h1><b>TASK FLOW</b></h1>
<hr />
<TaskForm onTaskAdd={handleTaskAdd} />
<hr />
<TaskList tasks={tasks} onTaskDelete={handleTaskDelete} onTaskComplete={handleTaskComplete} />
</div>
</div>
</div>
);
};

export default TaskManager;