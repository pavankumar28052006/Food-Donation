import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  foodType: {
    type: String,
    required: [true, 'Food type is required'],
    trim: true,
    minlength: [2, 'Food type must be at least 2 characters long']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required'],
    trim: true,
    minlength: [5, 'Pickup location must be at least 5 characters long']
  },
  contact: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^[0-9\-\+]{9,15}$/, 'Please enter a valid contact number (9-15 digits, numbers, +, - allowed)']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'expired'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Create indexes
donationSchema.index({ user: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: -1 });

export default mongoose.model('Donation', donationSchema); 