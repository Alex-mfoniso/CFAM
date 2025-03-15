import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB1QaC9-CV1by1DPG2q7zSDYbAJz2XH6c",
  authDomain: "cfam-v1.firebaseapp.com",
  projectId: "cfam-v1",
  storageBucket: "cfam-v1.appspot.com", // Fixed: Corrected storage bucket URL
  messagingSenderId: "1021096994729",
  appId: "1:1021096994729:web:002bef9b04f221ed1546b8",
  measurementId: "G-JSCZMT9YZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Correctly export all services
export { app, db, auth, storage };
