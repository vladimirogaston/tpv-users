const { connection, Sequelize } = require('./db.js')

const User = (sequelize, type) => {
    return sequelize.define('users',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mobile: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        surname: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING,
            unique: true,
            allowNull: false
        }, 
        dni: {
            type: type.INTEGER,
            unique: true,
            allowNull: false
        },
        address: {
            type: type.STRING,
            unique: false,
            default: ""
        },
        role: {
            type: type.STRING,
            allowNull: false
        },
        active: {
            type: type.BOOLEAN,
            default: true,
            allowNull: false
        }
    })
}

const UserDAO = User(connection, Sequelize)
module.exports = { UserDAO }
