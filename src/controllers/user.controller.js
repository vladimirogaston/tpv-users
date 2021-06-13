const { UserDAO } = require('../models/user.model')
const dotenv = require('dotenv')
const HttpException = require('./HttpException')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res, next) => {
    let userList = await UserDAO.findAll()
    res.send(userList)
}

const getUserById = async (req, res, next) => {
    const user = await UserDAO.findByPk(Number(req.params.id))
    if (!user) throw new HttpException(404, 'User not found')
    res.send(user)
}

const createUser = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8)
    }
    const result = await UserDAO.create(req.body)
    if (!result) throw new HttpException(500, 'Something went wrong')
    res.status(201).send('User was created!')
}

const updateUser = async (req, res, next) => {
    const target = await UserDAO.findByPk(Number(req.params.id))
    if(!target) throw new HttpException(404, 'Not found exception')
    target.id = req.params.id
    target = await UserDAO.save(target)
    if(!target) throw new HttpException(409, 'Conflict exception')
}

const deactivateUser = async (req, res, next) => {
    const target = await UserDAO.findByPk(Number(req.params.id))
    if(target) target.active = false
    await UserDAO.save(target)
}

const userLogin = async (req, res, next) => {
    const storedUser = await UserDAO.findOne({ where: { username: req.body.username }})
    if(!storedUser) {
        throw new HttpException(401, 'User not found exception')
    } else {
        const isMatch = await bcrypt.compare(req.body.password, storedUser.password)
        if(isMatch) {
            dotenv.config()
            const secretKey = process.env.SECRET_JWT
            const token = jwt.sign({ id: storedUser.id.toString(), role: storedUser.role }, secretKey, { expiresIn: '24h'})
            res.json({ 'id': storedUser.id, token: token })
        } else {
            throw new HttpException(403, 'Forbidden operation exception')
        }
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deactivateUser,
    userLogin
}