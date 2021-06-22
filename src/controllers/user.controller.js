const { UserDAO } = require('../models/user.model')
const HttpException = require('./HttpException')
const bcrypt = require('bcryptjs')
const rolesModel = require('../models/roles.model')

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
    req.body.active = true
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deactivateUser
}
