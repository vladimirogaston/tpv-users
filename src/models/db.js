const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const user = require('./user.model');

dotenv.config();
console.log('ENV:: ' + process.env.DB_DATABASE)
const connection = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.HOST,
        dialect: process.env.DB_DIALECT
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
