import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { CheckCircle, Lock, QrCode, ShieldCheck } from "lucide-react";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const Giving = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [donations, setDonations] = useState([]);
  const [loading] = useState(false);
  const [reason, setReason] = useState("");
  const [showHistory, setShowHistory] = useState(true);

  const suggestedAmounts = [10, 50, 100, 500];

  const handlePaystackCallback = async (response) => {
    try {
      await addDoc(collection(db, "donations"), {
        userId: user.uid,
        email: user.email,
        name: isAnonymous ? "Anonymous" : user.displayName || "CFAM Member",
        amount: parseFloat(amount),
        frequency,
        reason,
        paymentRef: response.reference,
        timestamp: serverTimestamp(),
      });
      alert("Thank you for your donation!");
      setAmount("");
      setReason("");
    } catch (err) {
      console.error("Error saving donation:", err);
      alert("Donation succeeded but could not save to database.");
    }
  };

  const handleDonate = () => {
    if (!user) {
      alert("You must be logged in to donate.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_48b9410051fab95be2b416ce4c0ffa5e50ce41fa",
      email: user.email,
      amount: parseFloat(amount) * 100,
      currency: "NGN",
      ref: uuidv4(),
      onClose: () => alert("Payment cancelled"),
      callback: (response) => {
        handlePaystackCallback(response);
      },
    });

    handler.openIframe();
  };

  // Fetch user's donations
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "donations"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userDonations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(userDonations);
      },
      (error) => {
        console.error(
          "Firestore error fetching donations:",
          error.code,
          error.message
        );
        alert("Unable to fetch donation history. Check console for details.");
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 pt-24 pb-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Give to the Church
        </h2>

        {!user && (
          <p className="text-center text-red-500 mb-4">
            <Lock className="inline w-5 h-5" /> You must{" "}
            <Link to="/login" className="text-blue-600 underline">
              log in
            </Link>{" "}
            before donating.
          </p>
        )}

        <div className="flex justify-center gap-3 mb-4">
          {suggestedAmounts.map((amt) => (
            <button
              key={amt}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${amount === amt ? 'bg-purple-700 text-white shadow-inner' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
              onClick={() => setAmount(amt)}
            >
              ₦{amt}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Enter custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        <label className="block mb-2">Donation Type:</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option value="one-time">One-Time</option>
          <option value="monthly">Monthly (Recurring)</option>
        </select>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="w-5 h-5"
          />
          <label>Give Anonymously</label>
        </div>

        {/* reason for donation */}
        <label className="block mb-2">Reason for Donations:</label>
        <textarea
          name=""
          id=""
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
          placeholder="Enter your reason or what you're thankful for..."
          rows={3}
        ></textarea>

        <label className="block mb-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option value="paystack">Paystack (Local Payments)</option>
        </select>

        <button className="flex items-center justify-center bg-purple-50 text-purple-700 border border-purple-100 py-3 px-4 rounded-xl w-full mb-4 hover:bg-purple-100 transition-colors">
          <QrCode className="w-5 h-5 mr-2" />
          Generate QR Code
        </button>

        <button
          onClick={handleDonate}
          disabled={!amount || !user || loading}
          className="w-full button py-4 font-bold"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
        
        <p className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Secure online giving powered by <span className="text-purple-600 font-bold">Paystack</span>
        </p>
      </div>

      <div className="mt-8 w-full max-w-lg">
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-lg font-bold">Donation History</h3>
    <button
      onClick={() => setShowHistory((prev) => !prev)}
      className="text-sm text-blue-600 underline"
    >
      {showHistory ? "Hide" : "Show"}
    </button>
  </div>

  {showHistory && (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {donations.length === 0 ? (
        <p className="text-gray-500 text-center">You haven&apos;t made any donations yet.</p>
      ) : (
        <ul className="space-y-3">
          {donations.map((donation) => (
            <li key={donation.id} className="flex items-start justify-between border-b pb-2">
              <div>
                <p className="font-medium">₦{donation.amount}</p>
                <p className="text-xs text-gray-500">
                  {donation.frequency} • {donation.name}
                </p>
                {donation.reason && (
                  <p className="text-xs text-gray-600 mt-1 italic">“{donation.reason}”</p>
                )}
              </div>
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
</div>

    </div>
  );
};

export default Giving;
