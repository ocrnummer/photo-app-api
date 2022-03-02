/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create user validation rules
 *
 * Required: email, password, first_name, last_name
 * Optional: -
 */

const createRules = [
	body('email').exists().isLength({ min: 4 }).custom(async value => {
		const user = await new models.Users({ email: value}).fetch({ required: false });
		if (user) {
			return Promise.rejected('Email already registered.');
		}
	}),
	body('password').exists().isLength({ min: 6 }),
	body('first_name').exists().isLength({ min: 4, max: 50 }),
	body('last_name').exists().isLength({ min: 4, max: 50 })
];

/**
 * Update photo validation rules
 *
 * Required: -
 * Optional:  password, first_name, last_name
 */

const updateRules = [
	body('password').optional().isLength({ min: 6 }),
	body('first_name').optional().isLength({ min: 4, max: 50 }),
	body('last_name').optional().isLength({ min: 4, max: 50 })
];

module.exports = {
	createRules,
	updateRules,
}
