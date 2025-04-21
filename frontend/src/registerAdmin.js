import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Ensure correct path

// Predefined credential for admin creation
const allowedAdminCredential = {
  email: "alexandermfoniso25@gmail.com", // Replace with your allowed email
  password: "SecurePassword123", // Replace with your allowed password
};

// Function to create an admin user
export const registerAdmin = async (email, password) => {
  try {
    // Check if the provided credentials match the allowed credentials
    if (email !== allowedAdminCredential.email || password !== allowedAdminCredential.password) {
      throw new Error("Unauthorized: Only specific credentials can create an admin account.");
    }

    // Create the admin user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data with admin role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "admin",
    });

    console.log("✅ Admin account created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin account:", error.message);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export default registerAdmin;