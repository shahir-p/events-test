// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDO3oi_5H7wSVDanM-QiOD8tNoRa5bVb6k",
    authDomain: "cabbon-e2bc7.firebaseapp.com",
    projectId: "cabbon-e2bc7",
    storageBucket: "cabbon-e2bc7.firebasestorage.app",
    messagingSenderId: "600348110860",
    appId: "1:600348110860:web:90e2eabd892fd679433e29",
    measurementId: "G-JM9LTWYHP5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
