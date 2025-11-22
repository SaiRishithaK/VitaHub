// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8LhuJ4Dle8_qouMYJvnASY0l9l7t4ZzY",
  authDomain: "vitahub-8e97f.firebaseapp.com",
  projectId: "vitahub-8e97f",
  storageBucket: "vitahub-8e97f.firebasestorage.app",
  messagingSenderId: "189857022172",
  appId: "1:189857022172:web:3fee022cef3bc1d9bdb419",
  measurementId: "G-ZPZVKPSPEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);