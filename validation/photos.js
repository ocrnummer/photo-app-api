/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create photo validation rules
 *
 * Required: title, url
 * Optional: comment
 */

const createRules = [
	body('title').exists().isLength({ min: 4 }),
	body('url').exists().isLength({ min: 4}),
	body('comment').optional().isLength({ min: 4, max: 100 })
];

/**
 * Update photo validation rules
 *
 * Required: -
 * Optional: title, url, comment
 */

const updateRules = [
	body('title').optional().isLength({ min: 4 }),
	body('url').optional().isLength({ min: 4}),
	body('comment').optional().isLength({ min: 4, max: 100 }),
];

module.exports = {
	createRules,
	updateRules,
}
