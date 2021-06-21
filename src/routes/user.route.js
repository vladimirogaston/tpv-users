const express = require('express')
const router = express.Router()

const awaitHandlerFactory = require('./middleware/await.handler.factory')
const validation = require('./middleware/validation.middleware')
const { createUserSchema } = require('./validations/user.scheme')
const { getAllUsers, getUserById, createUser, deactivateUser, updateUser } = require('../controllers/user.controller')

const auth = require('./middleware/authentication.middleware')
const roleBasedAuthorization = require('./middleware/roleBasedAuthorization.middleware')
const idBasedAuthorization = require('./middleware/idBasedAuthorization.middleware')
const role = require('../models/roles.model')
const rolesModel = require('../models/roles.model')

/**
 * @swagger
 * components:
 *   schemas: 
 *     User:
 *       type: object
 *       required:
 *         - mobile
 *         - email
 *         - firstname
 *         - surname
 *         - password
 *         - dni
 *         - address
 *         - role
 *         - active
 *       properties:
 *         mobile:
 *           type: string
 *           description: The user's phone
 *         email:
 *           type: string
 *           description: The user's email
 *         firstname:
 *           type: string
 *           description: The user's firstname
 *         surname:
 *           type: string
 *           description: The user's surname
 *         password:
 *           type: string
 *           description: The user's password
 *         dni:
 *           type: integer
 *           description: The user's dni
 *         address: 
 *           type: string
 *           description: The user's legal address
 *         role:
 *           type: string
 *           description: The user's role
 *         active:
 *           type: boolean
 *           description: The user's status
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
router.get('/', auth(), awaitHandlerFactory(roleBasedAuthorization(role.ADMIN)), awaitHandlerFactory(getAllUsers))

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
router.get('/:id', auth(), awaitHandlerFactory(roleBasedAuthorization([rolesModel.ADMIN, rolesModel.OPERATOR])),awaitHandlerFactory(getUserById))

/**
 * @swagger
 * /users/customers/{id}:
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
 router.get('/customers/:id', auth(), awaitHandlerFactory(roleBasedAuthorization([rolesModel.CUSTOMER])), awaitHandlerFactory(idBasedAuthorization()),awaitHandlerFactory(getUserById))

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
router.post('/', createUserSchema, validation, awaitHandlerFactory(createUser))

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
router.put('/:id', auth(), awaitHandlerFactory(idBasedAuthorization()), createUserSchema, validation, awaitHandlerFactory(updateUser))

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
router.delete('/id', auth(), awaitHandlerFactory(roleBasedAuthorization([role.ADMIN])), awaitHandlerFactory(deactivateUser))

module.exports = router