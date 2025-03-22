import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjust the path based on your project structure

// Function to create an admin user
export const registerAdmin = async (email, password) => {
  try {
    // Create user with email and password
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
  }
};

// Function to update user role
export const setAdminRole = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await setDoc(userRef, { role: "admin" }, { merge: true });
      console.log("✅ Admin role assigned successfully!");
    } else {
      console.log("❌ User document does not exist.");
    }
  } catch (error) {
    console.error("❌ Error updating role:", error);
  }
};
