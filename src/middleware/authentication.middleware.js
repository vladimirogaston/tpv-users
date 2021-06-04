const HttpException = require('../middleware/HttpException');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const auth = (...roles) => {
    return async function (req, res, next) {
        if(!req.headers['token']) throw new HttpException(404, 'Bad formed header exception');
        const token = req.headers['token'];
        const payload = jwt.decode(token, 'supersecret');
        if(payload.expiredAt < moment().unix()) throw HttpException(500, 'El token a expirado');
        next();
    }
}

module.exports = auth;
