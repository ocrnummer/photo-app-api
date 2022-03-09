/**
 * Users Controller
 */

const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');



/**
* Register a new user
*
* POST/
*/

const registerNewUser = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	const validData = matchedData(req);

	// Hashing 10 rounds
	try {
		validData.password = await bcrypt.hash(validData.password, models.Users.hashSalt);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Error when hashing the password.',
		});
		throw error;
	}

	// Save to database and show response without password
	try {
		const user = await new models.Users(validData).save();

		res.send({
			status: 'success',
			data: {
				email: req.body.email,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Error when creating a new user.',
		});
		throw error;
	}	
}




module.exports = {
	registerNewUser
}
