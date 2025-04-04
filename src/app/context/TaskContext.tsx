"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface NewTask {
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: NewTask) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(tasksData as Task[]);
    };

    fetchTasks();
  }, []);

  const addTask = async (task: NewTask) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      const newTask = { ...task, id: docRef.id }; 
      setTasks((prevTasks) => [...prevTasks, newTask]); 
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const toggleComplete = async (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      try {
        const taskDoc = doc(db, "tasks", id);
        await updateDoc(taskDoc, {
          completed: !taskToUpdate.completed,
        });
        setTasks((prevTasks) =>
          prevTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      } catch (e) {
        console.error("Error toggling task completion: ", e);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error("Error deleting task: ", e);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
