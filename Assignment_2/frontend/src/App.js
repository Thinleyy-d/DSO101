// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/api/tasks`);
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post(`${API_URL}/api/tasks`, { title: newTask });
    setNewTask('');
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    fetchTasks();
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/api/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // Edit task
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.title);
  };

  const saveEdit = async (id) => {
    await axios.put(`${API_URL}/api/tasks/${id}`, { title: editText });
    setEditingId(null);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>📝 To-Do List</h1>

      {/* Add Task */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px' }}>Add</button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task._id} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px', border: '1px solid #ddd', marginBottom: '8px',
          borderRadius: '5px', background: task.completed ? '#f0fff0' : 'white'
        }}>
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />

          {/* Edit mode */}
          {editingId === task._id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ flex: 1, padding: '4px' }}
              />
              <button onClick={() => saveEdit(task._id)}>Save</button>
            </>
          ) : (
            <>
              <span style={{
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none'
              }}>
                {task.title}
              </span>
              <button onClick={() => startEdit(task)}>Edit</button>
            </>
          )}

          {/* Delete */}
          <button onClick={() => deleteTask(task._id)}
            style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;