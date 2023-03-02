const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let connection = null;

const initDb = async (port) => {
  // Get URI
  const uri = process.env.MONGODB_URI;

  // Initialize listeners for Mongoose
  statusDb();

  // Start Mongoose connection
  mongoose.set('strictQuery', false);
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to Memory Database and listening in port ${port}`);
    })
    .catch((err) => {
      console.log(err.message);
      dropDB();
    });
};

const statusDb = () => {
  connection = mongoose.connection;
  connection.on('connected', () => {
    console.log('Mongoose connection established');
  });
  connection.on('error', (err) => {
    console.log(err.message);
  });
  connection.on('disconnected', () => {
    console.log('Mongoose connection is closed');
  });
};

module.exports = { initDb, statusDb };
