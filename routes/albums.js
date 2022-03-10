const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums_controller');
const albumsValidationRules = require('../validation/albums');


/* Get authenticated users albums */
router.get('/', albumsController.getAlbums);

/* Get a specific album */ 
router.get('/:albumId', albumsController.getSpecificAlbum);

/* Store a new album */ 
router.post('/', albumsValidationRules.createRules, albumsController.storeNewAlbum);

/* Update an album */
router.put('/:albumId', albumsValidationRules.updateRules, albumsController.updateAlbum);

/* Add a photo to an album */
router.post('/:albumId/photos', albumsValidationRules.addPhotoRules, albumsController.addPhoto);


module.exports = router;





