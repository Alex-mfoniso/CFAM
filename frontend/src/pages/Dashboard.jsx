import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase"; // Ensure you have firebase.js configured
import { LogOut, Edit } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const db = getFirestore(app);
  const storage = getStorage(app);

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setProfilePic(data.profilePic || "");
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle profile picture upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);

    const storageRef = ref(storage, `profile_pics/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user.uid), { profilePic: downloadURL });
    setProfilePic(downloadURL);
    setLoading(false);
  };

  // Save edited profile details
  const handleSave = async () => {
    setLoading(true);
    await updateDoc(doc(db, "users", user.uid), { name });
    setEditMode(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
          />
          <label className="absolute bottom-0 right-4 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <Edit size={16} />
          </label>
        </div>

        {/* Name Editing */}
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-4"
          />
        ) : (
          <h3 className="text-lg font-semibold mb-2">{name || "No Name"}</h3>
        )}

        <p className="text-gray-600 mb-4">{user?.email}</p>

        {/* Edit / Save Buttons */}
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
          >
            Edit Profile
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
