import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
