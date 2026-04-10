import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase"; // Ensure you have firebase.js configured
import { LogOut } from "lucide-react";
import { assets } from "../assets/asset";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profilePic, setProfilePic] = useState("");

  const db = getFirestore(app);

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfilePic(data.profilePic || "");
        }
      }
    };

    fetchUserData();
  }, [user, db]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profilePic || assets.profile}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
          />
          {/* <label className="absolute bottom-0 right-4 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <Edit size={16} />
          </label> */}
        </div>

        {/* Name Editing */}
        {/* {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-4"
          />
        ) : (
          <h3 className="text-lg font-semibold mb-2">{name || "No Name"}</h3>
        )} */}

        {/* <p className="text-gray-600 mb-4">{user?.email}</p> */}

        {/* Edit / Save Buttons */}
        {/* {editMode ? (
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
        )} */}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full button py-3 gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
