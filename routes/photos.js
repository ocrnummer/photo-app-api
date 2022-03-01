const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
const photosValidationRules = require('../validation/photos');

/* Get all resources */
router.get('/', photosController.index);

/* Get a specific resource */
router.get('/:id', photosController.show);

/* Store a new resource */
router.post('/', photosValidationRules.createRules, photosController.store);

/* Update a specific resource */
router.put('/:id', photosValidationRules.updateRules, photosController.update);

/* Destroy a specific resource */
router.delete('/:id', photosController.destroy);

module.exports = router;
