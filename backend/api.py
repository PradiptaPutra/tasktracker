from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import send_from_directory
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB, atau sesuaikan dengan kebutuhan Anda
app.config['UPLOAD_FOLDER'] = 'C:/Coding/tasktracker/tasktracker/backend/uploads'
 # Folder untuk menyimpan file yang diunggah

db = SQLAlchemy(app)
CORS(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    description = db.Column(db.String(200))
    deadline = db.Column(db.String(10))
    filename = db.Column(db.String(255))  # Menyimpan nama file

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    result = []
    for task in tasks:
        task_data = {
            'id': task.id,
            'title': task.title,
            'completed': task.completed,
            'description': task.description,
            'deadline': task.deadline,
            'filename': task.filename,
            'file_path': os.path.join(app.config['UPLOAD_FOLDER'], task.filename) if task.filename else None
        }
        result.append(task_data)
    return jsonify(result)

@app.route('/tasks', methods=['POST'])
def add_task():
    task_data = request.form.to_dict()
    # Mengambil file yang diunggah
    file = request.files.get('file')
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        task_data['filename'] = filename
    new_task = Task(title=task_data['title'], description=task_data['description'], deadline=task_data['deadline'], filename=task_data.get('filename'))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added successfully'})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'})
    task.completed = not task.completed
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found'})
    # Menghapus file terkait jika ada
    if task.filename:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], task.filename)
        if os.path.exists(filepath):
            os.remove(filepath)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})
@app.route('/uploads/<path:filename>', methods=['GET'])
def get_uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
