// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlJxQPSFOUUCGgEdFZ_BhGBaXuEy-I5xw",
  authDomain: "project-three-18c16.firebaseapp.com",
  databaseURL: "https://project-three-18c16-default-rtdb.firebaseio.com",
  projectId: "project-three-18c16",
  storageBucket: "project-three-18c16.appspot.com",
  messagingSenderId: "707037360118",
  appId: "1:707037360118:web:0a4673e95b38f3024521d7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;