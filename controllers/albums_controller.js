/**
 * Albums Controller
 */
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

/**
 * Get all albums
 *
 * GET /
 */
const getAlbums = async (req, res) => {
	// Get user from request
	await req.user.load("albums");

	res.status(200).send({
		status: "success",
		data: {
			albums: req.user.related("albums"),
		},
	});
};

/**
 * Get a specific album
 *
 * GET /:albumId
 */
const getSpecificAlbum = async (req, res) => {
	// get user from request
	const user = await req.user.load("albums");

	// check if album belongs to user
	const userAlbum = user
		.related("albums")
		.find((album) => album.id == req.params.albumId);

	if (userAlbum) {
		// get specifik album
		const photosFromAlbum = await models.Album.fetchById(
			req.params.albumId,
			{ withRelated: ["photos"] }
		);

		res.send({
			status: "success",
			data: photosFromAlbum,
		});
	} else {
		return res.status(404).send({ status: "Failed to get album" });
	}
};

/**
 * Create a new album
 *
 * POST /
 */
const storeNewAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// Get only validated data
	const validData = matchedData(req);

	// Write to user_id
	validData.user_id = req.user.id;

	try {
		// Save new album to db
		const album = await new models.Album(validData).save();

		res.send({
			status: "success",
			data: album,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Error when creating a new album.",
		});
		throw error;
	}
};

/**
 * Update a specific album
 *
 * PUT /:photoId
 */
const updateAlbum = async (req, res) => {
	// Check if album exists
	const album = await new models.Album({ id: req.params.albumId }).fetch({
		require: false,
	});
	if (!album) {
		res.status(404).send({
			status: "fail",
			data: "Album Not Found",
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		// save update to album
		const updateAlbum = await album.save(validData);

		res.send({
			status: "success",
			data: updateAlbum,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when updating an album.",
		});
		throw error;
	}
};

/**
 * Add a photo to an album
 *
 * PUT /:albumId
 */
const addPhoto = async (req, res) => {
	// Check for errors in validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// get only validated data
	const validData = matchedData(req);

	// find the right album and photo
	const album = await models.Album.fetchById(req.params.albumId, {
		withRelated: ["photos"],
	});
	const existing_photo = album
		.related("photos")
		.find((photo) => photo.id == validData.photo_id);

	// Check if photo already in album
	if (existing_photo) {
		return res.send({
			status: "fail",
			data: "Photo aldready in album",
		});
	}

	try {
		// save photo to ablum
		const result = await album.photos().attach(validData.photo_id);

		res.send({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Error when adding a photo to an album.",
		});
		throw error;
	}
};

module.exports = {
	getAlbums,
	getSpecificAlbum,
	storeNewAlbum,
	updateAlbum,
	addPhoto,
};
