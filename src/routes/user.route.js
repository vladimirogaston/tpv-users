const express = require('express')
const router = express.Router()

const awaitHandlerFactory = require('../middleware/await.handler.factory')
const validate = require('../middleware/validate.middleware')

const { createUserSchema } = require('./validations/userValidator.middleware')
const { getAllUsers, getUserById, createUser, deactivateUser, updateUser } = require('../controllers/user.controller')

const authenticate = require('../middleware/authenticate.middleware')
const role = require('../models/user.roles')

/**
 * @swagger
 * components:
 *   schemas: 
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The user's role
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
 *     security:
 *       - bearerAuth: []
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
router.get('/', authenticate(role.ADMIN), awaitHandlerFactory(getAllUsers))

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
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
router.get('/:id', authenticate(role.ADMIN), awaitHandlerFactory(getUserById))

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *       - bearerAuth: []
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
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       403:
 *         description: Access token is missing or invalid
 */
router.post('/', authenticate(role.ADMIN), createUserSchema, validate, awaitHandlerFactory(createUser))

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Updates one user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The customer was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict exception some values are in use by another user
 */
router.put('/:id', authenticate(role.ADMIN), createUserSchema, validate, awaitHandlerFactory(updateUser))

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deactivate one User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was successfully deactivated
 *       500:
 *         description: Some server error
 */
router.delete('/id', authenticate(role.ADMIN), validate, awaitHandlerFactory(deactivateUser))

module.exports = router