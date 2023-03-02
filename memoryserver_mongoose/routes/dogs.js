const { ObjectId } = require('mongodb');
const router = require('express').Router();
const { Dog } = require('../models/dog');

/**
 * GET ALL request
 *    returns all entries in the db
 */
router.get('/', async (req, res) => {
  Dog.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the entries.',
      });
    });
});

/**
 * GET ALL request
 *    returns entry that matched the id in the db
 */
router.get('/:id', validateID, async (req, res) => {
  Dog.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No data was found' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the entry by id.',
      });
    });
});

/**
 * POST request
 *    creates a new entry in the db
 */
router.post('/', async (req, res) => {
  const newDog = new Dog(req.body);
  newDog
    .save()
    .then((data) => {
      res.status(200).json(`New Entry ID: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating a new entry.',
      });
    });
});

/**
 * PUT request
 *    update an entry in the db
 */
router.put('/:id', validateID, (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No data was found' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json('badd');
    });
});

/**
 * GET ALL request
 *    deletes an entry in the db
 */
router.delete('/:id', validateID, (req, res) => {
  Dog.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'No data was found' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  });
});

//middleware
function validateID(req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ error: 'Invalid id format' });
  }
  next();
}

module.exports = router;
