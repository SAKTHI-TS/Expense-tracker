const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: String,  // Changed to String type to prevent Date conversion
    required: true,
    get: v => v,
    set: v => v
  }
}, {
  timestamps: false,  // Disable automatic timestamps
  toJSON: { getters: true }
});

module.exports = mongoose.model('expense', ExpenseSchema);