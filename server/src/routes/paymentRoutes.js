import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { optional } from '../middleware/auth.js';
import { mockUser } from '../middleware/testUser.js';

const router = express.Router();

// Use optional auth + mock user for development/testing
const devAuth = [optional, mockUser];

router.post('/create-order', devAuth, createOrder);
router.post('/verify-payment', devAuth, verifyPayment);

export default router;
