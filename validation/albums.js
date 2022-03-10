/**
* Album Validation Rules
*/
const { body } = require('express-validator');
const models = require('../models');

/**
* Create Album validation rules
*
* Required: title
* Optional: -
*/
const createRules = [
	body('title').exists().isLength({ min: 1 }),
];

/**
* Update Album validation rules
*
* Required: -
* Optional:  password, first_name, last_name
*/
const updateRules = [
	body('title').optional().isLength({ min: 1 }),
];

/**
* Add Photo rules
*/
const addPhotoRules = [
	body('photo_id').exists().bail().custom(async value => {
		const photo = await new models.Photo({ id: value }).fetch({ require: false });
		if (photo) {
			return Promise.resolve;

		}
		return Promise.reject('No photo with that id exists')
	})
];

module.exports = {
	createRules,
	updateRules,
	addPhotoRules,
}
