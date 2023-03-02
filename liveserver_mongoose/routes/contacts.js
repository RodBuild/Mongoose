const { ObjectId } = require('mongodb');
const router = require('express').Router();
const { Contact } = require('../models/contact'); // We specific export name

/**
 * GET ALL request
 *    returns all entries in the db
 */
router.get('/', (req, res) => {
  Contact.find()
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
router.get('/:id', validateID, (req, res) => {
  Contact.findById(req.params.id)
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
  const newContact = new Contact(req.body);
  newContact
    .save()
    .then((data) => {
      res.status(200).json(`New Entry ID: ${data._id}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: readErrors(err) || 'Some error occurred while creating a new entry.',
      });
    });
});

/**
 * PUT request
 *    update an entry in the db
 */
// Mongoose only updates values that exist in the matched entry
router.put('/:id', validateID, (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No data was found' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while updating the entry by id.',
      });
    });
});

/**
 * GET ALL request
 *    deletes an entry in the db
 */
router.delete('/:id', validateID, (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'No data was found' });
      } else {
        res.status(200).json({ message: 'Data deleted successfully' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Some error occurred while deleting the entry by id.',
      });
    });
});

// Handle Mongoose erros
function readErrors(err) {
  const errors = [];
  Object.keys(err.errors).forEach((key) => {
    errors.push(err.errors[key].message);
  });
  return errors;
}

//middleware
function validateID(req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ error: 'Invalid id format' });
  }
  next();
}

module.exports = router;
