const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

/* JSON.DB SETUP */
const adapter = new FileSync("./db.json")
const connection = low(adapter)
connection.defaults({ books: [] }).write()

module.exports = { connection }