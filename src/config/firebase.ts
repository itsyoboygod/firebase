// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxRQYFKM9RisoWqCXwDPotH3qWgskUZqE",
  authDomain: "login-fire-50bfb.firebaseapp.com",
  // authDomain: "https://itsyoboygod.github.io/",
  projectId: "login-fire-50bfb",
  storageBucket: "login-fire-50bfb.appspot.com",
  messagingSenderId: "229858287573",
  appId: "1:229858287573:web:e021273b41220f953ba75c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)