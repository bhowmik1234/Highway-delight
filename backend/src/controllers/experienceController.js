const Experience = require('../models/Experience');
const Slot = require('../models/Slot');

exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().select('title location price image description');
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await Experience.findById(id).lean();
    if (!details) return res.status(404).json({ message: 'Experience not found' });

    const slots = await Slot.find({ experienceId: id }).sort('date time');
    const availabilityMap = new Map();

    for (const slot of slots) {
      if (!availabilityMap.has(slot.date))
        availabilityMap.set(slot.date, { date: slot.date, slots: [] });
      availabilityMap.get(slot.date).slots.push({ time: slot.time, left: slot.left });
    }

    const availability = Array.from(availabilityMap.values());
    res.json({ ...details, availability });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience details' });
  }
};
