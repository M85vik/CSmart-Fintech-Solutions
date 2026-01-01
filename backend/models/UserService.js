const mongoose = require('mongoose');

const UserServiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true }, 
  provider: { type: String, required: true },
  accountNumber: { type: String, required: true },
  
  // Automation Fields
  totalLoanAmount: { type: Number, required: true },
  emiAmount: { type: Number, required: true }, 
  paymentDay: { type: Number, required: true }, 
  
  // Tracking
  amountPaid: { type: Number, default: 0 },
  installmentsPaid: { type: Number, default: 0 },
  
  // Status Control
  status: { 
    type: String, 
    enum: ['Active', 'Frozen', 'Closed'], 
    default: 'Active' 
  },
  
  nextDueDate: { type: Date }, 
  
}, { timestamps: true });

module.exports = mongoose.model('UserService', UserServiceSchema);