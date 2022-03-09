/**
 * Users Controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('photo-app-api:users_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


/**
 * Get authenticated user profile
 *
 * GET /

const getProfile = async (req, res) => {
	console.log(req.user.id)
	try {
		const user = await models.Users.fetchById(req.user.id);

		res.send({
			status: 'success',
			data: {
				user,
			}
		});
	} catch (error) {
		return res.sendStatus(404);
	}
}

*/







/**
 * Get a user photos or album
 *
 * GET /photos
 */

const getUserPhotos = async (req, res) => {
	const user = await new models.Users({ id: req.params.id })
		.fetch({ withRelated: ['photos'] });

	res.status(200).send({
		status: 'success',
		data: { 
			user: user.related('photos')
		}
	});
}


const getUserAlbums = async (req, res) => {
	const user = await new models.Users({ id: req.params.id })
		.fetch({ withRelated: ['albums'] });

	res.status(200).send({
		status: 'success',
		data: { 
			user: user.related('albums')
		}
	});
}











/**
 * Update a specific resource
 *
 * PUT /
 */
const updateUserProfile = async (req, res) => {

	// make sure user exists
	const user = await new models.Users({ id: req.params.id }).fetch({ require: false });
	if (!user) {
		debug("No user to update was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'User Not Found',
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

	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, models.User.hashSalt);
		} catch (error) {
			res.status(500).send({ 
				status: 'error', 
				message: 'Error when hashing password'
			});
			throw error;
		}
	}


	try {
		const updateUser = await user.save(validData);
		debug("Updated user successfully", updateUser);

		res.send({
			status: 'success',
			data: updateUser,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a user.',
		});
		throw error;
	}
}


/**
 * Remove a specific user
 *
 * DELETE /:Id
 */
const deleteUserProfile = async (req, res) => {

	const user = await new models.Users({ id: req.params.id }).fetch({ require: false });

	if (!user) {
		debug("No user was found", { id, });
		res.status(404).send({
			status: 'fail',
			data: 'User Not Found',
		});
		return;
	}

	try {

		const deleteUser = await user.destroy();
		debug("User deleted successfully", deleteUser);

		res.send({
			status: 'success',
		});

		if(!user) {
			return res.sendStatus(404);
		};

		} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when deleting a user.',
		});
		throw error;
	};
}





// const login = async (req, res) => {
// 	// destructure email and password from request body
// 	const { email, password } = req.body;

// 	// login the user
// 	const user = await models.User.login(email, password);
// 	if (!user) {
// 		return res.status(401).send({
// 			status: 'fail',
// 			data: 'Authentication failed.',
// 		});
// 	}

// 	/*
// 	// respond with the access-token
// 	return res.send({
// 		status: 'success',
// 		data: {
// 			access_token,
// //			access_token: access_token,
// 		}
// 	});
// 	*/
// }




module.exports = {
	getUserPhotos,
	getUserAlbums,
	// store,
	// login,
	updateUserProfile,
	deleteUserProfile,
}
