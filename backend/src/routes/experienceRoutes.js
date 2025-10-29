const express = require('express');
const router = express.Router();
const { getAllExperiences, getExperienceById } = require('../controllers/experienceController');

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

module.exports = router;
