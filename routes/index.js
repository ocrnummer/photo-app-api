const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

// Router
router.use('/photos', require('./photos'));
// router.use('/albums', require('./albums'));
// router.use('/users', require('./users'));


module.exports = router;
