const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  user: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
  },
  quantity: { type: Number, required: true },
  total: Number,
  discount: Number,
  finalTotal: Number,
  promoCode: String,
  referenceId: { type: String, required: true, unique: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
