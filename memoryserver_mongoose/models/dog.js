const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    hasTail: {
      type: Boolean,
    },
  },
  { collection: 'dogs' }
);

const Dog = mongoose.model('Dog', DogSchema);

module.exports = { Dog };
