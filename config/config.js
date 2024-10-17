// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGp51_NoBYcNKl84oFmkJQAzHkWO3_hD8",
  authDomain: "projetofinal-40ed4.firebaseapp.com",
  databaseURL: "https://projetofinal-40ed4-default-rtdb.firebaseio.com",
  projectId: "projetofinal-40ed4",
  storageBucket: "projetofinal-40ed4.appspot.com",
  messagingSenderId: "261227155321",
  appId: "1:261227155321:web:5fd9f5ff081d6d59b6e9a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getDatabase(app);