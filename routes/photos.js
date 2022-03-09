const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
const photosValidationRules = require('../validation/photos');

/* Get athenticated users photo */
router.get('/', photosController.getPhotos);


/* Get photo by id */
router.get('/:photoId', photosController.getSpecificPhoto);


/* Store a new photo */
router.post('/', photosValidationRules.createRules, photosController.storeNewPhoto);

/* Update a photo */
router.put('/:photoId', photosValidationRules.updateRules, photosController.updatePhoto);



module.exports = router;
