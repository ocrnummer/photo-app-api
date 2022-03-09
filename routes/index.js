const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');
const usersValidationRules = require('../validation/users');
const authentication = require('../middlewares/authentication');


/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

// Router
router.use('/photos', authentication.basic, require('./photos'));
router.use('/albums', authentication.basic, require('./albums'));

// router.use('/users', require('./users'));


router.post('/register', usersValidationRules.createRules, authController.registerNewUser);


module.exports = router;
