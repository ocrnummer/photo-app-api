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

const getPhotos = async (req, res) => {

	await req.user.load('photos');

	res.send({
		status: 'success',
		data: { 
			photos: req.user.related('photos')
		}
	});
}

/**
 * Get a specific photo 
 *
 * GET /:photoId
 */

const getSpecificPhoto = async (req, res) => {

	const photo = await new models.Photo({ id: req.params.photoId }).fetch({ withRelated: ['albums'] })

	res.send({
		status: 'success',
		data: photo,
	})
	
	// const user = await req.user.load('photos');

	// const userPhoto = user.related('photos').find(photo => photo.id == req.params.photosId);

	// console.log(userPhoto);
	
	// if (userPhoto) {
	// 	const userPhoto = await models.Photo.fetchById( req.params.photosId, { withRelated: ['user']});

	// 	res.send({
	// 		status: 'success',
	// 		data: userPhoto
	// 	})
	// } else {
	// 	return res.status(404).send({ status: 'Failed to get photo'})
	// }

}












// 	user_id = req.user.id;
// 	photo_id = req.params.photoId;

// 	const userPhoto = await new models.Photos().where({ 
// 		user_id: user_id, 
// 		id: photo_id }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

// 		res.status(200).send({
// 			status: 'success',
// 			data: userPhoto,
// 		});

// 	// console.log(user_id);
// 	// console.log(req.params.id);

// 	// user_id 

// }

	/*
	console.log(req.Users.id)
	const user = await models.Users.fetchById(req.Users.user_id, { withRelated: ['photos']});

	const userPhotos = user.related('photos');

	const specificPhoto = userPhotos.find(photo => photo.id == req.params.photoId);

	if (!specificPhoto) {
		res.status(404).send({
			status: 'error',
			message: 'No photo with requested ID was found'
		});
		return;
	}

	// const photo = await new models.Photos({ id: req.params.id })
	// 	.fetch({ withRelated: ['user'] });
	
	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

*/
/*
const show = async (req, res) => {
	console.log(req.user.id)

	const user = await models.Users.fetchById(req.user.id, { withRelated: ['photos']});

	const userPhotos = user.related('Photos');
	console.log(userPhotos)
	// const photos = userPhotos.find(photo => photo.id == req.params.id);

	if (!photos) {
		return res.status(404).send({
			status: 'fail',
			message: 'Photo could not be found',
		});
	}

	const photoId = await models.Photo.fetchById(req.params.photoId);

	res.send({
		status: 'success',
		data: {
			photos: photoId
		}
	});

	// const photo = await new models.Photos({ id: req.params.id })
	// 	.fetch({ withRelated: ['user', 'albums'] });

	// res.send({
	// 	status: 'success',
	// 	data: { 
	// 		photo,
	// 	}
	// });
}
*/

/*
const show = async (req, res) => {
	const user = await models.Users.fetchById(req.user.id, { withRelated: ['photos']});
	const userPhotos = user.related('photos');
	const photos = userPhotos.find(photo => photo.id == req.params.photo_id);

	if (!photos) {
		return res.status(404).send({
			status: 'fail',
			message: 'Photo could not be found',
	});
}

	const photoId = await models.Photos.fetchById(req.params.photo_id);

	res.send({
		status: 'success',
		data: {
			photos: photoId
		}
	});
}
*/


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

	validData.user_id = req.user.id;

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
			message: 'Exception thrown in database when updating a photo.',
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
	getPhotos,
	getSpecificPhoto,
	store,
	update,
	destroy,
}
