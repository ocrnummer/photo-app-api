/**
 * Photos Controller
 */
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

/**
 * Get all users photos
 *
 * GET /
 */
const getPhotos = async (req, res) => {
	// Get user and related photos from request
	await req.user.load("photos");

	res.send({
		status: "success",
		data: {
			photos: req.user.related("photos"),
		},
	});
};

/**
 * Get a specific photo
 *
 * GET /:photoId
 */
const getSpecificPhoto = async (req, res) => {
	// get user and related photos from request
	await req.user.load("photos");

	// check if photos belongs to user
	const relatedPhoto = req.user.related("photos");
	const userPhoto = relatedPhoto.find(
		(photo) => photo.id == req.params.photoId
	);

	if (!userPhoto) {
		return res.send({
			status: "fail",
			data: "Not authorized",
		});
	}
	res.send({
		status: "Success",
		data: userPhoto,
	});
};

/**
 * Post a new photo
 *
 * POST /
 */
const storeNewPhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// Write to user_id
	validData.user_id = req.user.id;

	try {
		// save new photo to db
		const photo = await new models.Photo(validData).save();

		res.send({
			status: "success",
			data: photo,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when posting a new photo.",
		});
		throw error;
	}
};

/**
 * Update a specific photo
 *
 * PUT /:photoId
 */
const updatePhoto = async (req, res) => {
	// make sure the photo exists
	const photo = await new models.Photo({ id: req.params.photoId }).fetch({
		require: false,
	});
	if (!photo) {
		res.status(404).send({
			status: "fail",
			data: "Photo Not Found",
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
		// save update to photo
		const updatePhoto = await photo.save(validData);

		res.send({
			status: "success",
			data: updatePhoto,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when updating an album.",
		});
		throw error;
	}
};

module.exports = {
	getPhotos,
	getSpecificPhoto,
	storeNewPhoto,
	updatePhoto,
};
