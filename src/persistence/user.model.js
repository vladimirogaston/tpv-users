const sequelize = require('sequelize')
const { connection } = require('./rdbms/db')

const User = (sequelize, type) => {
    return sequelize.define('user',{
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
        },
        first_name: {
            type: type.STRING,
            allowNull: false
        },
        last_name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        role: {
            type: type.STRING,
            allowNull: false
        },
        age: {
            type: type.INTEGER,
            allowNull: false
        }
    });
}

const UserDAO = User(connection, sequelize)
module.exports = { UserDAO }