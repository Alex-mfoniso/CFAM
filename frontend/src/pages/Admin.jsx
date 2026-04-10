import { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, getDoc, doc, serverTimestamp, query, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUpload, FaUsers, FaCog, FaBars, FaEnvelope } from "react-icons/fa"; // Icons from react-icons

const Admin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]); // State to store users
  const [subscribers, setSubscribers] = useState([]); // State to store newsletter subscribers
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

  // Fetch all subscribers (admin-only feature)
  const fetchSubscribers = async () => {
    try {
      const subQuery = query(collection(db, "subscribers"));
      const subSnapshot = await getDocs(subQuery);
      const subList = subSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(subList);
      toast.success("Subscribers loaded successfully.");
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers.");
    }
  };

  // Export subscribers to CSV
  const exportToCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }

    // Create CSV content
    const headers = ["Email", "Subscribed At"];
    const csvRows = [];
    csvRows.push(headers.join(","));

    subscribers.forEach(sub => {
      const date = sub.subscribedAt
        ? new Date(sub.subscribedAt.seconds * 1000).toLocaleString()
        : "Unknown";
      const row = [sub.email, `"${date}"`];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            <button
              onClick={uploadSermon}
              disabled={isLoading}
              className={`button py-2.5 px-6 ${isLoading ? "opacity-50" : ""
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
              className="button py-2 px-6 mb-4"
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

      case "newsletter":
        return (
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
            <p className="text-gray-600 mb-6">View your subscribers and export them to a CSV file to use with Mailchimp or SendGrid.</p>

            <div className="flex gap-4 mb-6">
              <button
                onClick={fetchSubscribers}
                className="button py-2 px-6"
              >
                Load Subscribers
              </button>

              <button
                onClick={exportToCSV}
                className="bg-purple-100 text-purple-700 font-bold px-4 py-2 rounded-md hover:bg-purple-200 flex items-center gap-2 border border-purple-200 transition-all"
                disabled={subscribers.length === 0}
              >
                Export to CSV
              </button>
            </div>

            {subscribers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left border-b font-semibold">Email</th>
                      <th className="py-3 px-4 text-left border-b font-semibold">Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{sub.email}</td>
                        <td className="py-3 px-4 border-b">
                          {sub.subscribedAt
                            ? new Date(sub.subscribedAt.seconds * 1000).toLocaleDateString()
                            : "Unknown"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No subscribers found. Click &quot;Load Subscribers&quot; to fetch data.</p>
            )}
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
        className={`bg-gray-900 text-white w-64 p-5 fixed h-full z-10 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setView("upload")}
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded transition-colors ${view === 'upload' ? 'bg-purple-700' : ''}`}
              >
                <FaUpload className="mr-2" /> Upload Sermon
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("users")}
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded transition-colors ${view === 'users' ? 'bg-purple-700' : ''}`}
              >
                <FaUsers className="mr-2" /> Manage Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("newsletter")}
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded transition-colors ${view === 'newsletter' ? 'bg-purple-700' : ''}`}
              >
                <FaEnvelope className="mr-2" /> Newsletter List
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("settings")}
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 rounded transition-colors ${view === 'settings' ? 'bg-purple-700' : ''}`}
              >
                <FaCog className="mr-2" /> Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-64 w-full overflow-y-auto">
        {/* Toggle Sidebar Button (Mobile) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 bg-purple-700 text-white rounded mb-4"
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