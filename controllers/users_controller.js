/**
 * Users Controller
 */

const debug = require('debug')('photo-app-api:users_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all users
 *
 * GET /
 */
const index = async (req, res) => {
	const all_users = await models.Users.fetchAll();

	res.send({
		status: 'success',
		data: { 
			users: all_users
		}
	});
}

/**
 * Get a user
 *
 * GET /:id
 */
const show = async (req, res) => {
	const user = await new models.Users({ id: req.params.id })
		.fetch({ withRelated: ['photos', 'albums'] });

	res.send({
		status: 'success',
		data: { 
			user,
		}
	});
}

/**
* Register a new user
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
		const user = await new models.Users(validData).save();
		debug("Register new user successfully", user);

		res.send({
			status: 'success',
			data: user,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when registering a new user.',
		});
		throw error;
	}
}

/**
 * Update a specific resource
 *
 * PUT /:Id
 */
const update = async (req, res) => {

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
const destroy = async (req, res) => {

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

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
