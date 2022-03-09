const bcrypt = require('bcrypt');
const debug = require('debug')('p:auth');
const models = require('../models');

/**
 * HTTP Basic Authentication
 */
const basic = async (req, res, next) => {
    debug("Hello from auth.basic!");

    if (!req.headers.authorization) {
        debug("Authorization header missing");

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required1',
        });
    }

    debug("Authorization header: %o", req.headers.authorization);

    const [authSchema, base64Payload] = req.headers.authorization.split(' ');


    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't basic");

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required2',
        });
    }

    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

    const [email, password] = decodedPayload.split(':');


    const user = await new models.User({ email }).fetch({ require: false });
    if (!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed3',
        });
    }
    const hash = user.get('password');

    const result = await bcrypt.compare(password, hash);
    if (!result) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed4',
        });
    }

    // finally, attach user to request
    req.user = user;

    // pass request along
    next();
}

module.exports = {
    basic,
}