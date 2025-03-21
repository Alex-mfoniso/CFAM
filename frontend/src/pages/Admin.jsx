import React, { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadSermon = async () => {
    // Validate inputs
    if (!title || !category || !file) {
      toast.error("All fields are required.");
      return;
    }

    // Validate file type
    if (file.type !== "audio/mp3" && file.type !== "audio/mpeg") {
      toast.error("Only MP3 files are allowed.");
      return;
    }

    // Validate file size (e.g., 50MB limit)
    const fileSizeLimit = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > fileSizeLimit) {
      toast.error("File size must be less than 50MB.");
      return;
    }

    // Check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be signed in to upload a file.");
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
          console.log("Upload progress:", progress); // Log progress
        },
        (error) => {
          console.error("Upload error:", error); // Log the error
          console.error("Error code:", error.code); // Log the error code
          console.error("Error message:", error.message); // Log the error message
          toast.error("Error uploading file. Please try again.");
          setIsLoading(false);
        },
        async () => {
          const audioUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File uploaded successfully. Download URL:", audioUrl); // Log the download URL
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

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Sermon</h2>
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
      <ToastContainer />
    </div>
  );
};

export default Admin;