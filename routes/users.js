const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const usersValidationRules = require('../validation/users');

/* Get all users */
router.get('/', usersController.index);

/* Get a user */
router.get('/:id', usersController.show);

/* Store a new user */
router.post('/', usersValidationRules.createRules, usersController.store);

/* Update a user */
router.put('/:id', usersValidationRules.updateRules, usersController.update);

/* Delete a user */
router.delete('/:id', usersController.destroy);

module.exports = router;
