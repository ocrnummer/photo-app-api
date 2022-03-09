const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const usersValidationRules = require('../validation/users');




/* Get athenticated users profile */
// router.get('/', usersController.getProfile);


/* Get athenticated users photos */
router.get('/photos', usersController.getUserPhotos);

/* Get athenticated users albums */
router.get('/albums', usersController.getUserAlbums);


/* Add a photo to the authenticated user */
// router.post('/photos', usersValidationRules.addPhoto, profileController.addphoto)







/* Register a new user */
// router.post('/', usersValidationRules.createRules, usersController.store);

// router.post('/login', usersController.login)

/* Update a user */
// router.put('/:id', usersValidationRules.updateRules, usersController.updateUserProfile);

/* Delete a user */
// router.delete('/:id', usersController.deleteUserProfile);

module.exports = router;
