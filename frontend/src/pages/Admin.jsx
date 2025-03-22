import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, getDoc, doc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaUpload, FaUsers, FaCog, FaBars } from "react-icons/fa"; // Icons from react-icons

const Admin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]); // State to store users
  const [view, setView] = useState("upload"); // State to manage the current view

  // Check if the current user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true); // User is an admin
        } else {
          setIsAdmin(false); // User is not an admin
          toast.error("You are not authorized to access this page.");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };
  
    checkAdmin();
  }, []);

  // Fetch all users (admin-only feature)
  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, "users"));
      const usersSnapshot = await getDocs(usersQuery);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle sermon upload
  const uploadSermon = async () => {
    if (!isAdmin) {
      toast.error("Only admins can upload.");
      return;
    }

    if (!title || !category || !file) {
      toast.error("All fields are required.");
      return;
    }

    if (file.type !== "audio/mp3" && file.type !== "audio/mpeg") {
      toast.error("Only MP3 files are allowed.");
      return;
    }

    const fileSizeLimit = 50 * 1024 * 1024; // 50MB
    if (file.size > fileSizeLimit) {
      toast.error("File size must be less than 50MB.");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const fileRef = ref(storage, `sermons/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("Error uploading file. Please try again.");
          setIsLoading(false);
        },
        async () => {
          const audioUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "sermons"), {
            title,
            category,
            audioUrl,
            date: new Date().toISOString().split("T")[0],
            timestamp: serverTimestamp(),
          });
          toast.success("Sermon uploaded successfully!");
          setTitle("");
          setCategory("");
          setFile(null);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading sermon. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render the current view based on the selected tab
  const renderView = () => {
    switch (view) {
      case "upload":
        return (
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Upload Sermon</h2>
            <input
              type="text"
              placeholder="Sermon Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 w-full rounded-md mb-4 border"
            />
            <input
              type="text"
              placeholder="Category (e.g., Faith, Worship)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 w-full rounded-md mb-4 border"
            />
            <input
              type="file"
              accept="audio/mp3, audio/mpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-3 w-full rounded-md mb-4 border"
            />
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            <button
              onClick={uploadSermon}
              disabled={isLoading}
              className={`bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Uploading..." : "Upload Sermon"}
            </button>
          </div>
        );

      case "users":
        return (
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <button
              onClick={fetchUsers}
              className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-700 mb-4"
            >
              Refresh Users
            </button>
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="p-4 border rounded-md">
                  <p className="font-semibold">{user.email}</p>
                  <p className="text-sm text-gray-600">Role: {user.role}</p>
                </li>
              ))}
            </ul>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Admin settings will go here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-5 fixed h-full transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setView("upload")}
                className="flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded"
              >
                <FaUpload className="mr-2" /> Upload Sermon
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("users")}
                className="flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded"
              >
                <FaUsers className="mr-2" /> Manage Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("settings")}
                className="flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded"
              >
                <FaCog className="mr-2" /> Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-64 w-full">
        {/* Toggle Sidebar Button (Mobile) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 bg-gray-800 text-white rounded mb-4"
        >
          <FaBars />
        </button>

        {isAdmin ? (
          renderView()
        ) : (
          <p className="text-red-500 font-semibold">You are not authorized to access this page.</p>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Admin;