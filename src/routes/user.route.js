const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.middleware');
const awaitHandlerFactory = require('../middleware/await.handler.factory');
const Role = require('../models/user.roles');
const { createUserSchema, validateLogin } = require('../models/validations/userValidator.middleware');
const validate = require('../middleware/validate.middleware');
const { 
    getAllUsers,
    getUserById,
    createUser,
    userLogin } = require('../controllers/user.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *         - token
 *       properties: 
 *         token:
 *           type: string
 *           description: jason web token
 * 
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: perravengativa
 *         password: caradechola
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The Users managing API
  */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', awaitHandlerFactory(getAllUsers)); // localhost:3000/api/v1/users

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Returns one user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user's id
 *     responses:
 *       200:
 *         description: Retrieve one user by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/:id', awaitHandlerFactory(getUserById)); // localhost:3000/api/v1/users/id/1

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/', createUser, validate, awaitHandlerFactory(createUser)); // localhost:3000/api/v1/users

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Generates a jason web token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The token was successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       500:
 *         description: Some server error
 */
router.post('/login', validateLogin, awaitHandlerFactory(userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;