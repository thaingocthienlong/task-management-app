import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task Management App</h1>
      <div className="row">
        <div className="col-md-5">
          <TaskForm 
            refreshTasks={refreshTasks} 
            setRefreshTasks={setRefreshTasks} 
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
          />
        </div>
        <div className="col-md-7">
          <TaskList 
            refreshTasks={refreshTasks} 
            setRefreshTasks={setRefreshTasks}
            setCurrentTask={setCurrentTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;