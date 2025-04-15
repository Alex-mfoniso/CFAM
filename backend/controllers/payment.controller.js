import axios from "axios";
import Donation from "../models/donation.model.js";
import jwt from "jsonwebtoken";


export const createCheckoutSession = async (req, res) => {
  try {
    const { donation } = req.body;

    if (!donation || !donation.currency || !donation.totalAmount || !req.user) {
      return res.status(400).json({ error: "Invalid donation data or user not authenticated" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    const amount = Math.round(donation.totalAmount * 100);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email, // required by Paystack
        amount: amount,
        currency: donation.currency || "NGN",
        metadata: {
          userId: req.user._id,
          totalAmount: donation.totalAmount,
        },
        callback_url: `${process.env.CLIENT_URL}/purchase-success`, // must be handled client-side
      },
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url, reference } = response.data.data;

    // Save donation to DB
    const newDonation = new Donation({
      user: req.user._id,
      currency: donation.currency,
      totalAmount: donation.totalAmount,
      paystackReference: reference,
    });

    await newDonation.save();

    res.status(200).json({ url: authorization_url });
  } catch (error) {
    console.error("Error initializing Paystack payment:", error.message);
    res.status(500).json({ message: "Error initializing payment", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { reference } = req.query;

    const verifyResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const { status, amount, currency } = verifyResponse.data.data;

    if (status === "success") {
      return res.status(200).json({ message: "Payment verified successfully", amount, currency });
    } else {
      return res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error verifying Paystack payment:", error.message);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};


export const verifyAccessToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // contains userId, etc.
    next();
  } catch (error) {
    console.error("Access token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};