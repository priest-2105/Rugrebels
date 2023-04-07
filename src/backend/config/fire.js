import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// import { db } from './firebaseConfig';
import "firebase/database"; 

const firebaseConfig = { 
    apiKey: "AIzaSyD76z5TYA7KDkamAJGQNn1BeHjEa9WySfQ",
  authDomain: "inside-perry-ace-art.firebaseapp.com",
  projectId: "inside-perry-ace-art",
  storageBucket: "inside-perry-ace-art.appspot.com",
  messagingSenderId: "612836468451",
  appId: "1:612836468451:web:3e0288e3c25cf9832247d6",
  measurementId: "G-S15PR4X5Q0"
      
  };


const app = initializeApp(firebaseConfig);

// inistiilaize firestrre 
export const db = getFirestore(app); 
export const auth = getAuth(app); 