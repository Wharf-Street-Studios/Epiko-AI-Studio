import crypto from 'crypto';
import { supabaseAdmin } from '../config/supabase.js';

// In production, install razorpay: npm install razorpay
// For now, we'll create mock responses

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { credits, amount } = req.body;

    // Validate inputs
    if (!credits || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Credits and amount are required'
      });
    }

    // In production, initialize Razorpay and create order:
    /*
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        credits: credits,
        user_id: req.user.id
      }
    });
    */

    // Mock order for development
    const orderId = `order_${crypto.randomBytes(12).toString('hex')}`;

    // Store order in database
    const { data: orderData, error } = await supabaseAdmin
      .from('payment_orders')
      .insert([{
        order_id: orderId,
        user_id: req.user?.id || 'test-user',
        credits: credits,
        amount: amount,
        currency: 'INR',
        status: 'created',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      // Continue anyway for development
    }

    res.json({
      success: true,
      orderId: orderId,
      amount: amount * 100, // amount in paise for Razorpay
      currency: 'INR'
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payments/verify-payment
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      credits
    } = req.body;

    // In production, verify signature:
    /*
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }
    */

    // Update order status in database
    const { error: updateError } = await supabaseAdmin
      .from('payment_orders')
      .update({
        status: 'completed',
        payment_id: razorpay_payment_id,
        completed_at: new Date().toISOString()
      })
      .eq('order_id', razorpay_order_id);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    // Add credits to user profile
    if (req.user?.id && !req.user.id.startsWith('test-user')) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      if (profile) {
        await supabaseAdmin
          .from('profiles')
          .update({
            credits: profile.credits + credits
          })
          .eq('id', req.user.id);
      }
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      credits: credits
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify payment'
    });
  }
};
