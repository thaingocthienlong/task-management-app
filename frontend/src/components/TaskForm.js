import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';

const TaskForm = ({ refreshTasks, setRefreshTasks, currentTask, setCurrentTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  
  useEffect(() => {
    if (currentTask) {
      setTaskData(currentTask);
    }
  }, [currentTask]);
  
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentTask) {
        await updateTask(currentTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      
      setTaskData({ title: '', description: '', status: 'pending' });
      setCurrentTask(null);
      setRefreshTasks(!refreshTasks);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  
  const handleCancel = () => {
    setTaskData({ title: '', description: '', status: 'pending' });
    setCurrentTask(null);
  };
  
  return (
    <div className="task-form mt-4">
      <h2>{currentTask ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            {currentTask ? 'Update Task' : 'Add Task'}
          </button>
          {currentTask && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;