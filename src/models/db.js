const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const connection = new Sequelize(
    process.env.DATABASE,
    'root',
    'root', {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

connection.sync({force: false}).then(()=>{
    console.log('Tablas sincronizadas');
});

module.exports = { connection }
