// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigDev = {
    apiKey: "AIzaSyBn8tSc5sukXThaEnm0ki0DAZrbg4V1tHk",
    authDomain: "dyno-crm.firebaseapp.com",
    projectId: "dyno-crm",
    storageBucket: "dyno-crm.appspot.com",
    messagingSenderId: "397372932850",
    appId: "1:397372932850:web:ce3b9d42d641088a22c66b",
    measurementId: "G-MWJ03PV8EL",
};

const firebaseConfigProd = {
    apiKey: "AIzaSyAzGI5JL1DCgrJ7rMEFd3IfYhl0PfSSwbA",
    authDomain: "crm-prod-36e44.firebaseapp.com",
    projectId: "crm-prod-36e44",
    storageBucket: "crm-prod-36e44.appspot.com",
    messagingSenderId: "1027884125754",
    appId: "1:1027884125754:web:c863544253659eef4daf03",
    measurementId: "G-E8EX497RGP",
};

let app;
console.log("ENV", process.env.NODE_ENV);
// Initialize Firebase
if (process.env.NODE_ENV === "development") {
    app = initializeApp(firebaseConfigDev);
    console.log("ENV DEV", process.env.NODE_ENV);
} else {
    app = initializeApp(firebaseConfigProd);
    console.log("ENV PROD", process.env.NODE_ENV);
}
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const instancesRef = "instances/";
