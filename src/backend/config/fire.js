import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8TorJxb8SWQUK_tFF2BBT3-rm7vu1HUY",
    authDomain: "inside-perryace-art.firebaseapp.com",
    projectId: "inside-perryace-art",
    storageBucket: "inside-perryace-art.appspot.com",
    messagingSenderId: "663066055581",
    appId: "1:663066055581:web:129ca34b0083403d67d574",
    measurementId: "G-JEJ3R2FW0M"
  };


  const app = initializeApp(firebaseConfig);


  export const auth = getAuth(app);