const bcrypt = require('bcrypt');
const models = require('../models');

/**
 * HTTP Basic Authentication
 */

const basic = async (req, res, next) => {

    //  Check header if for authorization exists
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization from header required',
        });
    }

    const [authSchema, base64Payload] = req.headers.authorization.split(' ');
    if (authSchema.toLowerCase() !== "basic") {

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }

    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

    const [email, password] = decodedPayload.split(':');


    const user = await new models.User({ email }).fetch({ require: false });
    if (!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed',
        });
    }
    const hash = user.get('password');

    const result = await bcrypt.compare(password, hash);
    if (!result) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed',
        });
    }

    req.user = user;

    next();
}

module.exports = {
    basic,
}