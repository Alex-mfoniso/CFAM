import React, { useState } from "react";
import { FaCheck, FaLock, FaQrcode, FaGlobe } from "react-icons/fa";

// Supported currencies
const currencies = {
  USD: { symbol: "$", rates: 1 }, // Base currency
  NGN: { symbol: "₦", rates: 1300 }, // Example conversion (1 USD = 1300 NGN)
  KES: { symbol: "KSh", rates: 160 }, // Example conversion (1 USD = 160 KES)
};

const Giving = () => {
  const [amount, setAmount] = useState(50);
  const [currency, setCurrency] = useState("USD");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Convert amount to selected currency
  const convertedAmount = (amount * currencies[currency].rates).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-2xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Support Our Mission
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Your donation helps us continue spreading love and faith.
        </p>

        {/* Currency Selector */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3 text-gray-500" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none border border-gray-300 text-gray-700 px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {Object.keys(currencies).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Suggested Amounts */}
        <div className="flex justify-center gap-3 mb-6">
          {[10, 50, 100].map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`px-6 py-3 rounded-lg border-2 transition-all ${
                amount === value
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:border-black hover:bg-gray-50"
              }`}
            >
              {currencies[currency].symbol}
              {(value * currencies[currency].rates).toFixed(2)}
            </button>
          ))}
          {/* Custom Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Custom"
          />
        </div>

        {/* One-time vs Recurring */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsRecurring(false)}
            className={`px-6 py-3 rounded-lg border-2 transition-all ${
              !isRecurring
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:border-black hover:bg-gray-50"
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setIsRecurring(true)}
            className={`px-6 py-3 rounded-lg border-2 transition-all ${
              isRecurring
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:border-black hover:bg-gray-50"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Anonymous Giving */}
        <label className="flex items-center gap-3 text-gray-700 mb-8">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-black"
          />
          Give Anonymously
        </label>

        {/* QR Code Section */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-xl flex flex-col items-center">
            <FaQrcode className="text-gray-700 text-5xl mb-4" />
            <span className="text-gray-700 font-medium">Scan to Donate</span>
          </div>
        </div>

        {/* Donate Button */}
        <button className="w-full bg-black text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-all" onClick={() => handleDonation("stripe")}>


          <FaLock />
          Donate {currencies[currency].symbol}
          {convertedAmount} Securely
        </button>

        {/* Testimonials */}
        <div className="mt-8 p-6 border-l-4 border-black bg-gray-50 rounded-xl">
          <p className="text-gray-700 italic">
            "This church has changed my life! My donations truly make a difference."
          </p>
          <p className="text-gray-600 font-semibold mt-3">– Emily Watson</p>
        </div>
      </div>
    </div>
  );
};

export default Giving;

const handleDonation = async (gateway) => {
  const donationData = { amount, currency, email: "user@example.com" };  



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
