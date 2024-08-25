// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOU40SnLpzECpdiJq3kNpRsQIasunIc0g",
  authDomain: "fir-todolist-1fc49.firebaseapp.com",
  projectId: "fir-todolist-1fc49",
  storageBucket: "fir-todolist-1fc49.appspot.com",
  messagingSenderId: "716599155842",
  appId: "1:716599155842:web:b83638fb0c8574556ee89b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const FIREBASE_AUTH = getAuth(app);


export { db, FIREBASE_AUTH };