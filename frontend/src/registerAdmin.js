import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Ensure correct path

// Function to create an admin user
export const registerAdmin = async (email, password) => {
  // try {
  //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //   const user = userCredential.user;

  //   // Save user data with admin role in Firestore
  //   await setDoc(doc(db, "users", user.uid), {
  //     email: user.email,
  //     role: "admin",
  //   });

  //   console.log("✅ Admin account created successfully!");
  // } catch (error) {
  //   console.error("❌ Error creating admin account:", error.message);
  // }
};
