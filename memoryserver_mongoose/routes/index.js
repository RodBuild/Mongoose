const router = require('express').Router();

router.get('/', async (req, res) => {
  return res.json({
    message: 'Hello, World ✌️',
    description: 'Testing Mongoose with a memory server',
  });
});

router.use('/dogs', require('./dogs.js'));

module.exports = router;
