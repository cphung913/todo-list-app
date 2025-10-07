// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXqWfjdcuqiM7iI6lzr5SMdDTemhWLq0w",
  authDomain: "to-do-list-3af67.firebaseapp.com",
  projectId: "to-do-list-3af67",
  storageBucket: "to-do-list-3af67.firebasestorage.app",
  messagingSenderId: "164837117499",
  appId: "1:164837117499:web:386d0b653d614671ef961e",
  measurementId: "G-SWR8LZ81Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;