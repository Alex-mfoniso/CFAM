import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB1QaC9-CV1by1DPG2q7zSDYbAJz2XH6c",
  authDomain: "cfam-v1.firebaseapp.com",
  projectId: "cfam-v1",
  storageBucket: "cfam-v1.firebasestorage.app",
  messagingSenderId: "1021096994729",
  appId: "1:1021096994729:web:002bef9b04f221ed1546b8",
  measurementId: "G-JSCZMT9YZC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
