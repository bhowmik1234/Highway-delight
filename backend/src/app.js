const express = require('express');
const cors = require('cors');
const experienceRoutes = require('./routes/experienceRoutes');
const promoRoutes = require('./routes/promoRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seedDatabase = require('./seed/seedDatabase');
const Experience = require('./models/Experience');

const app = express();
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/experiences', experienceRoutes);
app.use('/promo', promoRoutes);
app.use('/bookings', bookingRoutes);

// --- Optional: Auto-seed if empty ---
(async () => {
  const count = await Experience.countDocuments();
  if (count !== 0) await seedDatabase();
})();

module.exports = app;
