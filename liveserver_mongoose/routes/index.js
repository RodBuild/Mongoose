const router = require('express').Router();

router.get('/', (req, res) => {
  return res.json({
    message: 'Hello, World ✌️',
    description: 'Testing Mongoose with a live server',
  });
});
router.use('/contacts', require('./contacts'));

module.exports = router;
