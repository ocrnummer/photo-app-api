/**
 * Photos Controller
 */

const debug = require('debug')('photo-app-api:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all photos
 *
 * GET /
 */
const index = async (req, res) => {
	const all_photos = await models.Photos.fetchAll();

	res.send({
		status: 'success',
		data: { 
			photos: all_photos
		}
	});
}

/**
 * Get a photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	const photo = await new models.Photos({ id: req.params.id })
		.fetch({ withRelated: ['user', 'albums'] });

	res.send({
		status: 'success',
		data: { 
			photo,
		}
	});
}

/**
* Post a new photo
*
* POST /
*/

const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const photo = await new models.Photos(validData).save();
		debug("Post new photo successfully: %O", photo);

		res.send({
			status: 'success',
			data: photo,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when posting a new photo.',
		});
		throw error;
	}
}

/**
 * Update a specific photo
 *
 * PUT /:Id
 */
const update = async (req, res) => {

	// make sure photo exists
	const photo = await new models.Photos({ id: req.params.id }).fetch({ require: false });
	if (!photo) {
		debug("No photo to update was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'Photo Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatePhoto = await photo.save(validData);
		debug("Updated photo successfully", updatePhoto);

		res.send({
			status: 'success',
			data: updatePhoto,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new example.',
		});
		throw error;
	}
}

/**
 * Remove a specific photo
 *
 * DELETE /:Id
 */
const destroy = async (req, res) => {

	const photo = await new models.Photos({ id: req.params.id }).fetch({ require: false });

	if (!photo) {
		debug("No photo to delete was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'Photo Not Found',
		});
		return;
	}

	try {

		const deletePhoto = await photo.destroy();
		debug("Photo deleted successfully", deletePhoto);

		res.send({
			status: 'success',
		});

		if(!photo) {
			return res.sendStatus(404);
		};

		} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when deleting a photo.',
		});
		throw error;
	};
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
