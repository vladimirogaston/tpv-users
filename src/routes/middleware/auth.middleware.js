const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const HttpException = require('../../controllers/HttpException')

module.exports = (rol) => {
    return async function (req, res, next) {
        const authHeader = req.headers['authorization']
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new HttpException(403, 'Bad formed header exception')
        }

        dotenv.config()
        const secretKey = process.env.SECRET_JWT
        const token = authHeader && authHeader.split(' ')[2]
        
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey)
        } catch (err) {
            res.status(500).send('ERROR VERIFY')
        }
        
        const userROLE = decoded.role
        if (rol) {
            if (rol !== userROLE) {
                res.status(500).send('ERROR VERIFY ROLE')
            }
        }
        next()
    }
}