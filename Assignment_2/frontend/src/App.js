import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      setError('Task cannot be empty');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/tasks`, { title: newTask });
      setNewTask('');
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.title);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      setError('Task cannot be empty');
      return;
    }
    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, { title: editText });
      setEditingId(null);
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to edit task');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      fontFamily: 'Arial',
      padding: '20px'
    }}>
      <h1>📝 Todo List</h1>

      {error && (
        <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          data-testid="task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button
          data-testid="add-button"
          onClick={addTask}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      <div data-testid="task-list">
        {tasks.length === 0 && (
          <p style={{ color: 'gray' }}>No tasks yet. Add one above!</p>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            data-testid="task-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              marginBottom: '8px',
              borderRadius: '5px',
              background: task.completed ? '#f0fff0' : 'white'
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />

            {editingId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, padding: '4px' }}
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
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
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;