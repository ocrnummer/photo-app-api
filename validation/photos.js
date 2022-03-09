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
	body('title').exists().isLength({ min: 3 }),
	body('url').exists().isLength({ min: 4}),
	body('comment').optional().isLength({ min: 4, max: 100 }),
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



const addToAlbum = [
    body('photo_id').exists().isInt({ min: 1 })
]



module.exports = {
	createRules,
	updateRules,
	addToAlbum
}
