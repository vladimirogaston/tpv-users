const { UserDAO } = require('../models/user.model')
const dotenv = require('dotenv')
const HttpException = require('../middleware/HttpException')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res, next) => {
    let userList = await UserDAO.findAll()
    res.send(userList)
};

const getUserById = async (req, res, next) => {
    const user = await UserDAO.findOne({ id: req.params.id })
    if (!user) throw new HttpException(404, 'User not found')
    res.send(user)
};

const createUser = async (req, res, next) => {
    console.log(req.body)
    await hashPassword(req)
    const result = await UserDAO.create(req.body)
    if (!result) throw new HttpException(500, 'Something went wrong')
    res.status(201).send('User was created!')
};

const userLogin = async (req, res, next) => {
    const storedUser = await UserDAO.findOne({ where: { username: req.body.username }})
    if(!storedUser) {
        throw new HttpException(401, 'User not found exception')
    } else {
        const isMatch = await bcrypt.compare(req.body.password, storedUser.password)
        if(isMatch) {
            dotenv.config()
            const secretKey = process.env.SECRET_JWT
            const token = jwt.sign({ user_id: storedUser.id.toString() }, secretKey, { expiresIn: '24h'})
            res.json({ 'token': token })
        } else {
            throw new HttpException(403, 'Forbidden operation exception')
        }
    }
}

const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    userLogin
}
