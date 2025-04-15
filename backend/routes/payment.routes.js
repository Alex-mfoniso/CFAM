import express from 'express';
import { createCheckoutSession, checkoutSuccess,verifyAccessToken  } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-checkout-session', verifyAccessToken, createCheckoutSession);
router.post('/checkout-success', verifyAccessToken, checkoutSuccess);

export default router;
