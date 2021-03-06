const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const swaggerOptions = require('./swagger.options')
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const apiRouter = require('./src/routes/api.route')
const dotenv = require('dotenv')

dotenv.config()
console.log('ENVIRONMENT: ' + process.env.NODE_ENV)
require('./src/models/db')
const PORT = process.env.PORT || 4000

const specs = swaggerJsDoc(swaggerOptions)
const app = express()
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v0", apiRouter)

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
module.exports = { app }