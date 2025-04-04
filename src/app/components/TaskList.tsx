"use client"
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, toggleComplete, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      deleteTask(id); 
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="mb-4 flex gap-2">
        {["All", "Completed", "Pending"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${filter === f ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">{task.dueDate} - Priority: {task.priority}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => toggleComplete(task.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
