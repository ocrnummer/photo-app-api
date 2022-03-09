const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums_controller');
const albumsValidationRules = require('../validation/albums');

/* Get all albums */
router.get('/', albumsController.getAlbums);

/* Get a album */
router.get('/:albumId', albumsController.getSpecificAlbum);

/* Store a new album */
router.post('/', albumsValidationRules.createRules, albumsController.storeNewAlbum);

/* Update a album */
router.put('/:albumId', albumsValidationRules.updateRules, albumsController.updateAlbum);

/* Add a photo to an album */
// router.post('/:albumId', albumsValidationRules.addPhotoRules, albumController.addPhoto);

/* Destroy a album */
// router.delete('/:id', albumsController.destroy);

module.exports = router;





