// models/Card.js

const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String, 
  },
  tech: {
    type: String, 
  },
  link: {
    type: String, 
  },
  content: {
    type: String,
  }
});

const CardModel = mongoose.model('Card', cardSchema);
module.exports = CardModel;
