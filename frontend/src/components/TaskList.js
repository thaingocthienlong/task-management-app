import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask, updateTask } from '../api';

const TaskList = ({ refreshTasks, setRefreshTasks, setCurrentTask }) => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    getTasks();
  }, [refreshTasks]);
  
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setRefreshTasks(!refreshTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  const handleStatusChange = async (id, task) => {
    try {
      const updatedTask = { 
        ...task, 
        status: task.status === 'pending' ? 'completed' : 'pending' 
      };
      await updateTask(id, updatedTask);
      setRefreshTasks(!refreshTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleEdit = (task) => {
    setCurrentTask(task);
  };
  
  return (
    <div className="task-list mt-4">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Add one!</p>
      ) : (
        tasks.map((task) => (
          <div 
            key={task._id} 
            className={`card mb-3 ${task.status === 'completed' ? 'bg-light' : ''}`}
          >
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Status: {task.status}
                </small>
              </p>
              <div className="btn-group">
                <button 
                  className="btn btn-sm btn-outline-primary" 
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-success" 
                  onClick={() => handleStatusChange(task._id, task)}
                >
                  Toggle Status
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;