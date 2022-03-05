const { body } = require('express-validator');
const models = require('../models');

/**
 * Create user validation rules
 *
 * Required: email, password, first_name, last_name
 * Optional: -
 */

const createRules = [

    body('email').exists().isEmail().custom(async value => {
        const email = await new models.Users({ email: value }).fetch({ require: false });
        if (email) {
            return Promise.reject('Email already in use.');
        }
        return Promise.resolve();
    }),
    body('password').exists().isLength({ min: 6 }),
    body('first_name').exists().isLength({ min: 3 }),
    body('last_name').exists().isLength({ min: 3 }),
];





/**
 * Update user validation rules
 *
 * Required: -
 * Optional:  password, first_name, last_name
 */

const updateRules = [
	body('password').optional().isLength({ min: 6 }),
	body('first_name').optional().isLength({ min: 3 }),
	body('last_name').optional().isLength({ min: 3 })
];

module.exports = {
	createRules,
	updateRules,
}
