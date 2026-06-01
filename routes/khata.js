const express = require('express');
const router = express.Router();
const Khata = require('../models/Khata');
const { authenticate, authorize } = require('../middleware/auth');

// Get user's khata
router.get('/my-khata', authenticate, async (req, res) => {
  try {
    let khata = await Khata.findOne({ userId: req.userId });
    
    if (!khata) {
      khata = new Khata({ userId: req.userId });
      await khata.save();
    }

    res.json({
      success: true,
      khata: {
        balance: khata.balance,
        totalCredit: khata.totalCredit,
        totalDebit: khata.totalDebit,
        creditLimit: khata.creditLimit,
        availableCredit: khata.creditLimit - khata.balance,
        entries: khata.entries.slice(-10)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get complete khata history
router.get('/history', authenticate, async (req, res) => {
  try {
    const khata = await Khata.findOne({ userId: req.userId }).sort({ 'entries.date': -1 });
    if (!khata) {
      return res.status(404).json({ success: false, message: 'Khata not found' });
    }
    res.json({ success: true, entries: khata.entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add khata entry (Admin/System only)
router.post('/add-entry', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { userId, type, amount, description, orderId } = req.body;

    let khata = await Khata.findOne({ userId });
    if (!khata) {
      khata = new Khata({ userId });
    }

    khata.entries.push({
      type,
      amount,
      description,
      orderId
    });

    if (type === 'credit') {
      khata.totalCredit += amount;
      khata.balance += amount;
    } else if (type === 'debit') {
      khata.totalDebit += amount;
      khata.balance -= amount;
    }

    await khata.save();

    res.json({ success: true, message: 'Entry added', khata });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Settle khata (Admin only)
router.post('/settle', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { userId } = req.body;

    const khata = await Khata.findOne({ userId });
    if (!khata) {
      return res.status(404).json({ success: false, message: 'Khata not found' });
    }

    khata.entries.push({
      type: 'debit',
      amount: khata.balance,
      description: 'Payment settled',
      date: new Date()
    });

    khata.totalDebit += khata.balance;
    khata.balance = 0;
    khata.lastSettledDate = new Date();

    await khata.save();

    res.json({ success: true, message: 'Khata settled', khata });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
