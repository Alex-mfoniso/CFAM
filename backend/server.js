require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Flutterwave = require("@flutterwave/node");
const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* -------------------- 1️⃣ STRIPE PAYMENT -------------------- */
app.post("/donate/stripe", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- 2️⃣ FLUTTERWAVE PAYMENT -------------------- */
app.post("/donate/flutterwave", async (req, res) => {
  try {
    const { amount, currency, email } = req.body;
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

    const response = await flw.PaymentInitiation.create({
      tx_ref: `donate_${Date.now()}`,
      amount,
      currency,
      redirect_url: "https://your-website.com/payment-success",
      customer: { email },
      payment_options: "card,banktransfer,mobilemoney",
    });

    res.json({ paymentLink: response.data.link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- 3️⃣ PAYSTACK PAYMENT -------------------- */
app.post("/donate/paystack", async (req, res) => {
  try {
    const { amount, email, currency } = req.body;

    const response = await paystack.transaction.initialize({
      amount: amount * 100, // Convert to Kobo
      email,
      currency,
      callback_url: "https://your-website.com/payment-success",
    });

    res.json({ paymentLink: response.data.authorization_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- 4️⃣ SERVER LISTENING -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
