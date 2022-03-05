const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums_controller');
const albumsValidationRules = require('../validation/albums');

/* Get all albums */
router.get('/', albumsController.index);

/* Get a album */
router.get('/:id', albumsController.show);

/* Store a new album */
router.post('/', albumsValidationRules.createRules, albumsController.store);

/* Update a album */
router.put('/:id', albumsValidationRules.updateRules, albumsController.update);

/* Destroy a album */
router.delete('/:id', albumsController.destroy);

module.exports = router;





