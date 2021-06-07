const HttpException = require('../middleware/HttpException')
const moment = require('moment')
const { UserDAO } = require('../models/db')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const authenticate = () => {
    return async function (req, res, next) {
        /*if(!req.headers['Authentication']) throw new HttpException(404, 'Bad formed header exception')
        const token = req.headers['Authentication']
        dotenv.config()
        const payload = jwt.decode(token, process.env.SECRET_JWT)
        if(payload.expiredAt < moment().unix()) throw HttpException(500, 'El token a expirado')
        */
        if (!req.headers.authorization || req.headers.authorization.startsWith('Bearer ')) {
            throw new HttpException(401, 'Invalid credentials exception')
        }
        dotenv.config()
        const token = req.headers.authorization.replace('Bearer ', '')
        const payload = jwt.decode(token, process.env.SECRET_JWT)
        const user = await UserDAO.findOne({ where: payload.id })
        if(!user  || payload.id !== user.id) {
            throw new HttpException(401, 'Authentication fails')
        }
        if(payload.expiredAt < moment().unix()) {
            throw HttpException(500, 'El token a expirado') 
        }
        req.body.role = user.role
        next()
    }
}

module.exports = authenticate