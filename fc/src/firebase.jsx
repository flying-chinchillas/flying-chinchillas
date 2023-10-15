// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAahm9N_buw28f7J5A34BEFzJAI41x4vW4",
  authDomain: "flying-chinchillas.firebaseapp.com",
  projectId: "flying-chinchillas",
  storageBucket: "flying-chinchillas.appspot.com",
  messagingSenderId: "377387982101",
  appId: "1:377387982101:web:10eaf557a804da6cb99d1c",
  measurementId: "G-CGB4GNZJ08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;