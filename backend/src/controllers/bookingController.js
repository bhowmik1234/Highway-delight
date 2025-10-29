const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { experience, date, time, quantity, user, finalTotal, discount, promoCode, total } = req.body;
    if (!experience || !date || !time || !quantity || !user)
      return res.status(400).json({ success: false, message: 'Missing booking details.' });

    const updatedSlot = await Slot.findOneAndUpdate(
      { experienceId: experience.id, date, time, left: { $gte: quantity } },
      { $inc: { left: -quantity } },
      { new: true }
    );

    if (!updatedSlot)
      return res.status(400).json({ success: false, message: 'Not enough slots available.' });

    const referenceId = `HUF${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const booking = new Booking({ experienceId: experience.id, slotId: updatedSlot._id, user, quantity, total, discount, finalTotal, promoCode, referenceId });
    await booking.save();

    res.status(201).json({ success: true, referenceId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Booking failed.' });
  }
};
