const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const user = require('./user.model');

dotenv.config();
const connection = new Sequelize(
    process.env.DATABASE,
    'root',
    'root', {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

/*LOS OBJETOS QUE VOY A USAR EN LOS CONTROLADORES PARA ACCEDER A LOS DATOS*/
const UserModel = user(connection, Sequelize);

connection.sync({force: false}).then(()=>{
    console.log('Tablas sincronizadas');
});

module.exports = {
    UserModel
}