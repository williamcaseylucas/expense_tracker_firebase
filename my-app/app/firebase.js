// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdc5b9sJiPNAgbswoZ__eILeAqNaWNooI",
  authDomain: "expense-tracker-454e1.firebaseapp.com",
  projectId: "expense-tracker-454e1",
  storageBucket: "expense-tracker-454e1.appspot.com",
  messagingSenderId: "349934834010",
  appId: "1:349934834010:web:753e7821fa9097be122363",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Added this
