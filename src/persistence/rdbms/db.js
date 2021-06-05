const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const switchDb = ()=> {
    const database = process.env.NODE_ENV == 'test' ? process.env.DATABASE_TEST : process.env.DATABASE
    console.log('DATABASE: ' + database)
    return database
}

const DATABASE = switchDb()
const connection = new Sequelize(
    'users_api',
    'root',
    'root', {
        host: process.env.HOST,
        dialect: 'mariadb'
    }
);

connection.sync({force: false}).then(()=>{
    console.log('Tablas sincronizadas');
});

module.exports = { connection }