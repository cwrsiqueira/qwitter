// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBT7t0VIkPey014sNQVjkxxDqAZCSk_NxQ",
  authDomain: "qwiter-20e92.firebaseapp.com",
  projectId: "qwiter-20e92",
  storageBucket: "qwiter-20e92.appspot.com",
  messagingSenderId: "98062182472",
  appId: "1:98062182472:web:6311a518c8c196b640907d"
});

const db = getFirestore();

export default db;
