const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  longDescription: String,
  about: String,
});

module.exports = mongoose.model('Experience', experienceSchema);
