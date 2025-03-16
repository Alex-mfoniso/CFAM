import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { CheckCircle, Lock, QrCode } from "lucide-react";

const Giving = () => {
  const { user } = useAuth(); // Get logged-in user
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const suggestedAmounts = [10, 50, 100, 500];

  const handleDonate = () => {
    if (!user) {
      alert("You must be logged in to donate.");
      return;
    }
    // Process payment here (backend logic needed)
    console.log({ amount, isAnonymous, frequency, paymentMethod });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Give to the Church</h2>

        {!user && (
          <p className="text-center text-red-500 mb-4">
            <Lock className="inline w-5 h-5" /> You must <Link to="/login" className="text-blue-600 underline">log in</Link> before donating.
          </p>
        )}

        {/* Suggested Amounts */}
        <div className="flex justify-center gap-3 mb-4">
          {suggestedAmounts.map((amt) => (
            <button
              key={amt}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setAmount(amt)}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <input
          type="number"
          placeholder="Enter custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        {/* Frequency Selection */}
        <label className="block mb-2">Donation Type:</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option value="one-time">One-Time</option>
          <option value="monthly">Monthly (Recurring)</option>
        </select>

        {/* Anonymous Donation Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="w-5 h-5"
          />
          <label>Give Anonymously</label>
        </div>

<<<<<<< HEAD
        {/* Donate Button */}
        <button className="w-full bg-black text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-all" onClick={() => handleDonation("stripe")}>


          <FaLock />
          Donate {currencies[currency].symbol}
          {convertedAmount} Securely
=======
        {/* Payment Method Selection */}
        <label className="block mb-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option value="stripe">Stripe (Card)</option>
          <option value="flutterwave">Flutterwave (Bank/Mobile Money)</option>
          <option value="paystack">Paystack (Local Payments)</option>
        </select>

        {/* QR Code Button */}
        <button className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded-md w-full mb-4">
          <QrCode className="w-5 h-5 mr-2" />
          Generate QR Code
>>>>>>> 7fc66ce888792a9ed7607379d5bf4c2b27b6a2f7
        </button>

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          disabled={!amount || !user}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          Donate Now
        </button>
      </div>

      {/* Transaction History (Placeholder) */}
      <div className="mt-8 w-full max-w-lg">
        <h3 className="text-lg font-bold mb-3">Donation History</h3>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <p className="text-gray-500 text-center">No donations yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Giving;

<<<<<<< HEAD
const handleDonation = async (gateway) => {
  const donationData = { amount, currency, email: "user@example.com" };  
=======
// import React, { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import { app } from "../firebase";

// const GivingPage = () => {
//   const auth = getAuth(app);
//   const db = getFirestore(app);
//   const [user, setUser] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [anonymous, setAnonymous] = useState(false);
//   const [paymentProvider, setPaymentProvider] = useState("stripe");
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchUser = () => {
//       setUser(auth.currentUser);
//     };
//     fetchUser();
//   }, [auth]);

//   const handleDonate = async () => {
//     if (!user) {
//       alert("Please log in before donating.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "donations"), {
//         userId: user.uid,
//         amount,
//         anonymous,
//         paymentProvider,
//         timestamp: new Date(),
//       });

//       alert("Donation successful!");
//       setAmount("");
//     } catch (error) {
//       console.error("Donation error: ", error);
//     }
//   };

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!user) return;
//       const querySnapshot = await getDocs(collection(db, "donations"));
//       setHistory(querySnapshot.docs.map((doc) => doc.data()));
//     };
//     fetchHistory();
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Give to Support</h1>
//       <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="w-full p-2 border rounded-md mb-4"
//         />
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={anonymous}
//             onChange={() => setAnonymous(!anonymous)}
//           />
//           Give Anonymously
//         </label>

//         <select
//           value={paymentProvider}
//           onChange={(e) => setPaymentProvider(e.target.value)}
//           className="w-full p-2 border rounded-md my-4"
//         >
//           <option value="stripe">Stripe</option>
//           <option value="flutterwave">Flutterwave</option>
//           <option value="paystack">Paystack</option>
//         </select>

//         <button
//           onClick={handleDonate}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Donate Now
//         </button>
//       </div>

//       <div className="mt-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Donation History</h2>
//         <div className="bg-white p-4 shadow rounded-md">
//           {history.map((donation, index) => (
//             <div key={index} className="border-b py-2">
//               <p>
//                 <strong>Amount:</strong> ${donation.amount}
//               </p>
//               <p>
//                 <strong>Provider:</strong> {donation.paymentProvider}
//               </p>
//               <p>
//                 <strong>Anonymous:</strong> {donation.anonymous ? "Yes" : "No"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
>>>>>>> 7fc66ce888792a9ed7607379d5bf4c2b27b6a2f7

// export default GivingPage;


  let url = "";  
  if (gateway === "stripe") {
    const response = await fetch("http://localhost:5000/donate/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });
    const data = await response.json();
    if (data.clientSecret) {
      // Redirect to Stripe checkout
      alert("Stripe Payment Initialized!");
    }
  } else if (gateway === "flutterwave" || gateway === "paystack") {
    const response = await fetch(`http://localhost:5000/donate/${gateway}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });
    const data = await response.json();
    if (data.paymentLink) {
      window.location.href = data.paymentLink; // Redirect to payment page
    }
  }
};
