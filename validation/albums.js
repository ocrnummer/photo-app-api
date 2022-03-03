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
 * Optional: title
 */
const updateRules = [
	body('title').optional().isLength({ min: 1 }),
];

module.exports = {
	createRules,
	updateRules,
}
