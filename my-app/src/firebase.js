import "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2-NRBHXrYuAEPxGDhP6ixh2PctdOs38s",
  authDomain: "mibodaom.firebaseapp.com",
  projectId: "mibodaom",
  storageBucket: "mibodaom.appspot.com",
  messagingSenderId: "705831524512",
  appId: "1:705831524512:web:38263f8cea652db10f11c5",
  measurementId: "G-JQG0ZTRQWB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
