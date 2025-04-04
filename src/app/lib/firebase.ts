// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdriFepUQtZQpT3DNP7e88Q_DnkZJuwu0",
  authDomain: "taskmanagementsystem-309c8.firebaseapp.com",
  projectId: "taskmanagementsystem-309c8",
  storageBucket: "taskmanagementsystem-309c8.firebasestorage.app",
  messagingSenderId: "630912769742",
  appId: "1:630912769742:web:4d9451a1f4c6bdd7f73a9f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
