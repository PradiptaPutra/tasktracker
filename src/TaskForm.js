
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ onTaskAdd }) => {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [deadline, setDeadline] = useState("");
const [file, setFile] = useState(null);

const handleTitleChange = (e) => {
setTitle(e.target.value);
};

const handleDescriptionChange = (e) => {
setDescription(e.target.value);
};

const handleDeadlineChange = (e) => {
setDeadline(e.target.value);
};

const handleFileChange = (e) => {
setFile(e.target.files[0]);
};

const handleSubmit = (e) => {
e.preventDefault();
if (title.trim() === "") {
return;
}
const formData = new FormData();
formData.append("title", title);
formData.append("description", description);
formData.append("deadline", deadline);
if (file) {
formData.append("file", file);
}
onTaskAdd(formData); // Mengirimkan objek FormData yang berisi data tugas dan file
setTitle("");
setDescription("");
setDeadline("");
setFile(null);
};

return (
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="title">Task Name :</label>
<input
       type="text"
       className="form-control"
       id="title"
       name="title"
       placeholder="Add New Task"
       value={title}
       onChange={handleTitleChange}
     />
</div>
<div className="form-group">
<label htmlFor="description">Task Description :</label>
<input
       type="text"
       className="form-control"
       id="description"
       name="description"
       placeholder="Add Description"
       value={description}
       onChange={handleDescriptionChange}
     />
</div>
<div className="form-group">
<label htmlFor="deadline">Deadline :</label>
<input
       type="date"
       className="form-control"
       id="deadline"
       name="deadline"
       value={deadline}
       onChange={handleDeadlineChange}
     />
</div>
<div className="form-group">
<label htmlFor="file">Uploud File :</label>
<input
       type="file"
       className="form-control-file"
       id="file"
       name="file"
       onChange={handleFileChange}
     />
</div>
<button type="submit" className="btn btn-primary">
Add Task
</button>
{file && (
<div className="mt-2">
<strong>Uploaded files :</strong> {file.name}
</div>
)}
</form>
);
};

TaskForm.propTypes = {
onTaskAdd: PropTypes.func.isRequired,
};

export default TaskForm;