// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK3VhOodf_fZlOv-2R_fb1q3TQNPOYvwQ",
  authDomain: "walk101-b1cb3.firebaseapp.com",
  projectId: "walk101-b1cb3",
  storageBucket: "walk101-b1cb3.appspot.com",
  messagingSenderId: "435247856118",
  appId: "1:435247856118:web:72dba39ae024d136c9efd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "asia-northeast3")