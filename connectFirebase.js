// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4kZcau4_xtB9PE9zRVQ3Ncg933EZXmWM",
  authDomain: "esp32-75e6e.firebaseapp.com",
  databaseURL: "https://esp32-75e6e-default-rtdb.firebaseio.com",
  projectId: "esp32-75e6e",
  storageBucket: "esp32-75e6e.appspot.com",
  messagingSenderId: "450003118061",
  appId: "1:450003118061:web:c897e3f4e7786c09cea9e4",
  measurementId: "G-KMFE1HXWKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
export default database