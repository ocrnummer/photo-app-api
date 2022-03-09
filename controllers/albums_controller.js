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
const getAlbums = async (req, res) => {

	await req.user.load('albums');

	res.status(200).send({
		status: 'success',
		data: {
			albums: req.user.related('albums')
		},
	});

}





/**
 * Get an album
 *
 * GET /:albumId
 */
const getSpecificAlbum = async (req, res) => {
	// console.log(req.params.albumId)
	// console.log(req.user.id)

	const user = await req.user.load('albums');

	const userAlbum = user.related('albums').find(album => album.id == req.params.albumId);

	if (userAlbum) {
		const photosFromAlbum = await models.Album.fetchById( req.params.albumId, { withRelated: ['photos']});

		res.send({
			status: 'success',
			data: photosFromAlbum
		})
	} else {
		return res.status(404).send({ status: 'Failed to get album'})
	}

}







/**
* Create a new album
*
* POST /
*/

const storeNewAlbum = async (req, res) => {

	const validData = matchedData(req);

	validData.user_id = req.user.id;

	try {
		const album = await new models.Album(validData).save();
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
 * PUT /:photoId
 */
const updateAlbum = async (req, res) => {

	// make sure the album exists
	const album = await new models.Album({ id: req.params.albumId }).fetch({ require: false });
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
};







const addPhoto = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array()});
	}

	const validData = matchedData(req);


	const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });
	const album = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos'] });

    const existing_photo = album.related('photos').find(photo => photo.id == validData.photo_id);
	const userAlbums = user.related('albums').find(album => album.id == req.params.albumId);
	const userPhotos = user.related('photos').find(photo => photo.id == validData.photo_id);


	if (existing_photo) {
		return res.send({
			status: 'fail', 
			data: 'Photo aldready in album'
		});
	}

	try {
		const result = await album.photos().attach(validData.photo_id);
	
		res.send({
			status: 'success', 
			data: null,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Error when adding a photo to an album.'
		})
		throw error;
	}
}

module.exports = {
	getAlbums,
	getSpecificAlbum,
	storeNewAlbum,
	updateAlbum,
	addPhoto,
}
