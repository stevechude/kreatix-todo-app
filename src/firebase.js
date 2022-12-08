// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdsr4DFuWgsNrsHcQYHgx7IRkRUBIk4Do",
  authDomain: "kreatix-todo-app.firebaseapp.com",
  projectId: "kreatix-todo-app",
  storageBucket: "kreatix-todo-app.appspot.com",
  messagingSenderId: "569604491322",
  appId: "1:569604491322:web:bac30a8d22b9f7a2144d03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
