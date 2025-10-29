const PromoCode = require('../models/PromoCode');

exports.validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ valid: false, message: 'Promo code is required' });

    const promo = await PromoCode.findOne({ code: code.toUpperCase() });
    if (promo)
      res.json({ valid: true, type: promo.type, value: promo.value });
    else
      res.status(404).json({ valid: false, message: 'Invalid promo code' });
  } catch (error) {
    res.status(500).json({ message: 'Error validating promo code' });
  }
};
