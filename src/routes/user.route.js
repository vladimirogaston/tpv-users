const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.middleware');
const awaitHandlerFactory = require('../middleware/await.handler.factory');
const Role = require('../persistence/user.roles');
const { createUserSchema, validateLogin } = require('../persistence/validations/userValidator.middleware');
const validate = require('../middleware/validate.middleware');
const { getAllUsers, getUserById, createUser, userLogin } = require('../controllers/user.controller');

router.get('/', auth(), awaitHandlerFactory(getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(Role.ADMIN), awaitHandlerFactory(getUserById)); // localhost:3000/api/v1/users/id/1
router.post('/', createUserSchema, validate, awaitHandlerFactory(createUser)); // localhost:3000/api/v1/users
router.post('/login', validateLogin, awaitHandlerFactory(userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;