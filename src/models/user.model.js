const { connection, Sequelize } = require('./db.js')

const User = (sequelize, type) => {
    return sequelize.define('users',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            unique: true,
            allowNull: false
        }
    })
}

const UserDAO = User(connection, Sequelize)
module.exports = { UserDAO }
