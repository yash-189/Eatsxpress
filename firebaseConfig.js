// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";
import 'firebase/auth';

import {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    messagingSenderId,
    appId,
    storageBucket
} from '@env'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(apiKey,'hhhhhhhhhhhhh');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJRjhQ0o5N5K4iycVtzxrjRif1L91n_A4",
  authDomain: "eatxpress-93e52.firebaseapp.com",
  databaseURL: "https://eatxpress-93e52-default-rtdb.firebaseio.com",
  projectId: "eatxpress-93e52",
  storageBucket: "eatxpress-93e52.appspot.com",
  messagingSenderId: "735371731452",
  appId: "1:735371731452:web:59315a7efa66a2d6485279",
  measurementId: "G-Z6DRRH5P2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);
auth.languageCode = 'it';



// const analytics = getAnalytics(app)