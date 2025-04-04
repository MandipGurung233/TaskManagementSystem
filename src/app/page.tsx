import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <TaskProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Task Management System</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
