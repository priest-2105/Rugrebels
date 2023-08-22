import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// You don't need to log db here, it won't provide meaningful information
