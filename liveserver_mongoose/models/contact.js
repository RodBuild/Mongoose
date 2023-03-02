//https://mongoosejs.com/docs/schematypes.html#schematype-options
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: [true, 'Firstname is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
    },
    favoriteColor: {
      type: String,
    },
    birthday: {
      type: String,
    },
  },
  { collection: 'contacts' }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = { Contact };
