/*
*   HTTP Basic Authentication Middleware
*/

const bcrypt = require('bcrypt');
const debug = require('debug')('photo-app-api:auth');
const { User } = require('../models');

const basic = async (req, res, next) => {
    debug('Basic authentication middleware');

    console.log(req.header.authorization)

    if (!req.header.authorization) {
        debug('No authorization header')

        return res.status(401).send({
            status: 'fail',
            data: 'Failed to authorize'
        });
    }

    debug('Authorization header', req.headers.authorization);

    const [ authSchema, base64Payload ] = req.headers.authorization.split(' ');

    if (authSchema.toLowerCase() !== 'basic') {
		debug("Authorization schema isn't basic");

        return res.status(401).send({
			status: 'fail',
			data: 'Authorization required',
		});
    }

    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

    const [ email , password] = decodedPayload.split(':');

	const user = await User.login( email, password );
	if (!user) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

    req.user = user;

    next();

}


module.exports = {
	basic
}
