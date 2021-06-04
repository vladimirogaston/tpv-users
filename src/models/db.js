const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const user = require('./user.model');

dotenv.config();
const connection = new Sequelize(
    'users_api',
    'root',
    'root', {
        host: 'localhost',
        dialect: 'mariadb'
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
