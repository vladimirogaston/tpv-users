const express = require('express')
const { userLogin } = require('../controllers/user.controller')
const awaitHandlerFactory = require('./middleware/await.handler.factory')
const { validateLoginSchema } = require('./validations/login.schema')
const validation = require('./middleware/validation.middleware')
const router = express.Router()

/**
 * @swagger
 * components:
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
 *     Auth:
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
 *           description: Thec user's password
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The authentication managment API
 */

/**
 * @swagger
 * /authentication:
 *   post:
 *     summary: Generates a jason web token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The token was successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       403:
 *         description: The input values does not match with an existent user
 *       500:
 *         description: Some server error
 */
router.post('/', validateLoginSchema, validation, awaitHandlerFactory(userLogin))

module.exports = router