import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cmpt372-project-auth.firebaseapp.com",
  projectId: "cmpt372-project-auth",
  storageBucket: "cmpt372-project-auth.appspot.com",
  messagingSenderId: "235446792486",
  appId: "1:235446792486:web:f91548bef7b86c199c91e7",
  measurementId: "G-BR1QPRKZTY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
