/* SERVER & GLOBAL MIDDLEWARE */
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
/* DB.JSON */
const low = require("lowdb")
/* SWAGGER */
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const { options } = require('./swagger.config')
/* API-ROUTES */
const api = require('./routes/api.route')
/* ENVIRONMENT VARIABLES */
const dotenv = require('dotenv')

/* JSON.DB SETUP */
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("../db.json")
const db = low(adapter)
db.defaults({ books: [] }).write()

/* SWAGGER SETUP */
const specs = swaggerJsDoc(options)
const app = express()
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.db = db

/* SERVER SETUP */
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v0/", api)

/* SERVER START */
dotenv.config()
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))