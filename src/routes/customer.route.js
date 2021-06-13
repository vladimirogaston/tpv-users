const express = require('express')
const router = express.Router()

const awaitHandlerFactory = require('./middleware/await.handler.factory')
const validate = require('./middleware/validate.middleware')
const authenticate = require('./middleware/authenticate.middleware')

const { createCustomerSchema } = require('./validations/customer.schema.validation')
const role = require('../models/roles.model')
const { getUserById, createUser, updateUser, deactivateUser } = require('../controllers/user.controller')

/**
 * @swagger
 * components:
 *   schemas:
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
 */

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: The Customers managing API
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns one Customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the customer's id
 *     responses:
 *       200:
 *         description: Retrieve one customer by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               schema:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get('/:id', authenticate(role.CUSTOMER), awaitHandlerFactory(getUserById))

/**
 * @swagger
 * /customers:
 *   post:  
 *     summary: Create a new customer
 *     tags: [Customers]
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
router.post('/', 
    createCustomerSchema, 
    validate, 
    (req, res, next) => {
        req.body.role = role.CUSTOMER
        next()
    },
    awaitHandlerFactory(createUser)
)

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Updates a customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The customer was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 *       409:
 *         description: Conflict exception some values are in use by another customer
 */
router.put('/:id', authenticate(role.CUSTOMER), createCustomerSchema, validate, awaitHandlerFactory(updateUser))

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deactivate a customer
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The customer was successfully deactivated
 *       500:
 *         description: Some server error
 */
router.delete('/id', authenticate(role.CUSTOMER), validate, awaitHandlerFactory(deactivateUser))

module.exports = router