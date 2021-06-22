const { UserDAO } = require('../models/user.model')
const dotenv = require('dotenv')
const HttpException = require('./HttpException')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const rolesModel = require('../models/roles.model')

module.exports = async (req, res, next) => {
    const storedUser = await UserDAO.findOne({ where: { mobile: req.body.mobile }})
    if(!storedUser) {
        throw new HttpException(401, 'User not found exception')
    } else {
        const isMatch = await bcrypt.compare(req.body.password, storedUser.password)
        if(isMatch) {
            dotenv.config()
            const secretKey = process.env.SECRET_JWT
            const token = jwt.sign({
              id: storedUser.id.toString(),
              mobile: storedUser.mobile,
              firstname: storedUser.firstname,
              role: storedUser.role
            },
            secretKey, { expiresIn: '24h'})
            res.json({ 'id': storedUser.id, token: token })
        } else {
            throw new HttpException(403, 'Forbidden operation exception')
        }
    }
}
