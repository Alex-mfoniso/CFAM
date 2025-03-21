  import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app);

// Correctly export all services
export { app, db, auth, storage,provider, collection, addDoc, getDocs  };




// // https://drive.google.com/file/d/1D92YvZrShdjT0SB0e9SKEpGnalqO_5C4/view?usp=drive_link
//  https://drive.google.com/file/uc?export=download&id=1D92YvZrShdjT0SB0e9SKEpGnalqO_5C4
