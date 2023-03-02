const express = require('express');
const db = require('./db/connect');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/', require('./routes'));

try {
  db.initDb(port);
  app.listen(port);
} catch (err) {
  console.log(err);
}
