const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
const photosValidationRules = require('../validation/photos');

/* Get athenticated users photo */
router.get('/', photosController.index);


/* Get photo by id */
router.get('/:photoId', photosController.show);


/* Store a new photo */
router.post('/', photosValidationRules.createRules, photosController.store);

/* Update a photo */
router.put('/:id', photosValidationRules.updateRules, photosController.update);

/* Destroy a photo */
router.delete('/:id', photosController.destroy);

module.exports = router;
