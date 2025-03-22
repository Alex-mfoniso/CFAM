import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjust the path if needed

const setAdminRole = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await setDoc(userRef, { role: "admin" }, { merge: true });
      console.log("Admin role assigned successfully!");
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.error("Error updating role:", error);
  }
};

// Replace "USER_UID_HERE" with the actual user UID from Firebase Auth
setAdminRole("OODmIqUK5LfdWvFuE2i6FIGi9tP2");


export { setAdminRole }; // E