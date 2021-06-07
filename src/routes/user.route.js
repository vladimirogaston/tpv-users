const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authentication.middleware')
const authorize = require('../middleware/authentication.middleware')
const awaitHandlerFactory = require('../middleware/await.handler.factory')
const validate = require('../middleware/validate.middleware')
const setCustomerRole = require('../middleware/customer.middleware')

const role = require('../models/user.roles')
const { createUserSchema, createCustomerSchema, validateLogin } = require('../models/validations/userValidator.middleware')
const { getAllUsers, getUserById, createUser, userLogin } = require('../controllers/user.controller')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwt:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         authorization:
 *           type: string
 *           description: The api-key token
 *         example:
 *           authorization: Bearer ...thekoken
 *
 *     Customer:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username: 
 *           type: string
 *           description: The customer's username
 *         password: 
 *           type: string
 *           description: Thec customer's password
 *       example:
 *         username: AugustoPinoche
 *         password: killer   
 * 
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
 *       example:
 *         username: perravengativa
 *         password: caradechola
 *         role: Operator
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
router.get('/', awaitHandlerFactory(getAllUsers))

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
router.get('/:id', awaitHandlerFactory(getUserById))

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *       - jtw: []
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
router.post('/', authenticate(), authorize(role.ADMIN), createUserSchema, validate, awaitHandlerFactory(createUser))

/**
 * @swagger
 * /users/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: The customer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict exception some values are in use by another customer
 */
router.post('/customers', createCustomerSchema, validate, setCustomerRole, awaitHandlerFactory(createUser))

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
router.post('/login', validateLogin, awaitHandlerFactory(userLogin))

module.exports = router