import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// import { db } from './firebaseConfig';
import "firebase/database"; 

const firebaseConfig = { 
  apiKey: "AIzaSyDdeMtKKTxEjxP0ybuwwKNp2t_pj_J4cKM",
  authDomain: "rugrebelsstore.firebaseapp.com",
  projectId: "rugrebelsstore",
  storageBucket: "rugrebelsstore.appspot.com",
  messagingSenderId: "720688673274",
  appId: "1:720688673274:web:454b24d1d43001726d7443",
  measurementId: "G-EG9E14MDJW"
    
  };

// inistiilaize firebase 
const app = initializeApp(firebaseConfig);

// inistiilaize firestore 
export const db = getFirestore(app); 
export const auth = getAuth(app); 