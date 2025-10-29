const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  left: { type: Number, required: true, min: 0 },
});

slotSchema.index({ experienceId: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Slot', slotSchema);
