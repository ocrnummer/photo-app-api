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
	// body('user_id').exists().bail().custom(async value => {
	// 	const user = await new models.User({ id: value }).fetch({ require: false });
	// 	if(!user) {
	// 		return Promise.rejected(`No user with ${value} exists.`)
	// 	}
	// 	return Promise.resolve();
	// }),
];

/**
 * Update Album validation rules/**
 * Update user validation rules
 *
 * Required: -
 * Optional:  password, first_name, last_name
 *
 *
 * Required: -
 * Optional: title
 */
const updateRules = [
	body('title').optional().isLength({ min: 1 }),
];

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
