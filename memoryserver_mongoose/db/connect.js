const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryDb = null;
let connection = null;

const initDb = async (port) => {
  if (memoryDb) {
    console.log('Memory Database already exists');
  } else {
    // Initialize a new MongoMemoryServer object
    memoryDb = await MongoMemoryServer.create();
    const uri = memoryDb.getUri();

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
  }
};

// This adds listeners to the mongoose.connection status
// When connection opens ->
// When connection closes ->
// When connection fails ->
const statusDb = async () => {
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

const dropDb = async () => {
  if (memoryDb) {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await memoryDb.stop();
    console.log(
      '\nMemory Server and Mongoose connection have been stopped. Press (Y/N) to continue...'
    );
  }
};

process.on('SIGINT', async () => {
  await dropDb();
  process.exit(0);
});

module.exports = { initDb };
