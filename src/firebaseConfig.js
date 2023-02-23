import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlIj1rdVe1zGlwbK6HYzSGJAqYPsEMW6k",
  authDomain: "fir-basics-6adc1.firebaseapp.com",
  projectId: "fir-basics-6adc1",
  storageBucket: "fir-basics-6adc1.appspot.com",
  messagingSenderId: "228546361563",
  appId: "1:228546361563:web:d0ce64fbfe81289565b4fe",
  measurementId: "G-5J4R6019KJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log(db)