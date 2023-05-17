// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn8tSc5sukXThaEnm0ki0DAZrbg4V1tHk",
  authDomain: "dyno-crm.firebaseapp.com",
  databaseURL: "https://dyno-crm-default-rtdb.firebaseio.com",
  projectId: "dyno-crm",
  storageBucket: "dyno-crm.appspot.com",
  messagingSenderId: "397372932850",
  appId: "1:397372932850:web:ce3b9d42d641088a22c66b",
  measurementId: "G-MWJ03PV8EL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
