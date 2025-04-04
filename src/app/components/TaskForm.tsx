"use client"
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    await addTask(newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
}