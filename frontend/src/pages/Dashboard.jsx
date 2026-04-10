import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import { motion } from "framer-motion";
import { LogOut, Camera, Edit2, Save, User, Mail, Shield } from "lucide-react";
import { assets } from "../assets/asset";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setName(user.displayName || "");
        setProfilePic(user.photoURL || "");
        
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.displayName) setName(data.displayName);
            if (data.profilePic) setProfilePic(data.profilePic);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleFileUpload = async (file) => {
    if (!file || !user) return;
    
    setUploading(true);
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update Auth Profile
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        profilePic: downloadURL
      });
      
      setProfilePic(downloadURL);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !name.trim()) return;
    
    setLoading(true);
    try {
      // Update Auth Profile
      await updateProfile(auth.currentUser, { displayName: name });
      
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        displayName: name,
        updatedAt: new Date().toISOString()
      });
      
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Account Hero */}
      <section className="bg-[rgb(24,24,27)] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-zinc-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">My <span className="text-gray-300 underline decoration-purple-600 decoration-4 underline-offset-8">Account</span></h1>
          <p className="text-gray-400 max-w-lg mx-auto">Manage your profile, update your information, and stay connected with the CFAM family.</p>
        </motion.div>
      </section>

      {/* Main Profile Card Container */}
      <div className="flex-grow flex items-start justify-center px-6 -mt-12 pb-20 relative z-10">
        <motion.div 
          className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Cover Accent */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-700"></div>
          
          <div className="px-8 pb-12">
            {/* Profile Picture Section */}
            <div className="relative -mt-16 mb-8 flex justify-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                  <img
                    src={profilePic || assets.profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2.5 rounded-2xl shadow-lg hover:bg-purple-700 transition transform hover:scale-110"
                >
                  <Camera size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-8">
              <div className="text-center">
                {editMode ? (
                  <div className="relative max-w-sm mx-auto">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-3 bg-gray-50 border-2 border-purple-100 rounded-2xl focus:border-purple-500 focus:outline-none text-center text-xl font-bold"
                      placeholder="Your Full Name"
                      autoFocus
                    />
                  </div>
                ) : (
                  <h3 className="text-3xl font-black text-[rgb(24,24,27)]">{name || "CFAM Member"}</h3>
                )}
                <p className="text-gray-500 flex items-center justify-center gap-1.5 mt-2 font-medium">
                  <Mail size={16} /> {user?.email}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Type</p>
                    <p className="font-bold text-[rgb(24,24,27)]">Member</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</p>
                    <p className="font-bold text-[rgb(24,24,27)]">Verified</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                {editMode ? (
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="button w-full flex items-center justify-center gap-2 py-4 shadow-xl"
                  >
                    {loading ? "Saving..." : <><Save size={20} /> Save Changes</>}
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full border-2 border-purple-600 text-purple-600 font-black py-4 rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={20} /> Edit Profile
                  </button>
                )}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-4 text-gray-400 font-bold hover:text-red-500 transition"
                >
                  <LogOut size={20} /> Logout Account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
