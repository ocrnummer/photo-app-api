/**
 * Albums Controller
 */

const debug = require('debug')('photo-app-api:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all albums
 *
 * GET /
 */
const index = async (req, res) => {
	const all_albums = await models.Albums.fetchAll();

	res.send({
		status: 'success',
		data: { 
			albums: all_albums
		}
	});
}

/**
 * Get an album
 *
 * GET /:Id
 */
const show = async (req, res) => {
	const album = await new models.Albums({ id: req.params.id })
		.fetch({ withRelated: ['user', 'photos'] });

	res.send({
		status: 'success',
		data: { 
			album,
		}
	});
}

/**
* Create a new album
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
		const album = await new models.Albums(validData).save();
		debug("Created a new album successfully", album);

		res.send({
			status: 'success',
			data: album
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
}

/**
 * Update a specific album
 *
 * PUT /:Id
 */
const update = async (req, res) => {

	// make sure the album exists
	const album = await new models.Albums({ id: req.params.id }).fetch({ require: false });
	if (!album) {
		debug("No album to update was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
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
		const updateAlbum = await album.save(validData);
		debug("Updated album successfully", updateAlbum);

		res.send({
			status: 'success',
			data: updateAlbum,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating an album.',
		});
		throw error;
	}
}

/**
 * Remove a specific album
 *
 * DELETE /:Id
 */
const destroy = async (req, res) => {

	const album = await new models.Albums({ id: req.params.id }).fetch({ require: false });

	if (!album) {
		debug("No album to delete was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
		});
		return;
	}

	try {

		const deleteAlbum = await album.destroy();
		debug("Album deleted successfully", deleteAlbum);

		res.send({
			status: 'success',
		});

		if(!album) {
			return res.sendStatus(404);
		};

		} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when deleting a album.',
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
