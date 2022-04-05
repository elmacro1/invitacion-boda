import "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3yfB10p3J-wIeZwE7pFxeQuPdalpCPlg",
  authDomain: "mibodaom-12150.firebaseapp.com",
  projectId: "mibodaom-12150",
  storageBucket: "mibodaom-12150.appspot.com",
  messagingSenderId: "432885743781",
  appId: "1:432885743781:web:a974213e7d6e7e5a21cd4c",
  measurementId: "G-LS04JWVH0Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Inicializamos el login
export const auth = getAuth(app);
