const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { authenticate } = require('../middleware/auth');

// Get all payments (for user)
router.get('/', authenticate, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId })
      .populate('orderId', 'orderId total status')
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get payment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (payment.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
