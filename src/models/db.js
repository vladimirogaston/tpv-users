const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const user = require('./user.model');

const switchDb = ()=> {
    dotenv.config();
    let connection = null
    if(process.env.NODE_ENV == 'development') {
        connection = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USER,
            process.env.DB_PASS, {
                host: process.env.HOST,
                dialect: process.env.DB_DIALECT
            }
        )
        console.log('INITIALIZE DEVELOPMENT DB')
    } else if(process.env.NODE_ENV == 'test'){
        connection = new Sequelize('sqlite::memory:')
        console.log('INITIALIZE TEST_DB')
    }
    return connection
}
/*LOS OBJETOS QUE VOY A USAR EN LOS CONTROLADORES PARA ACCEDER A LOS DATOS*/
const connection = switchDb()
const UserDAO = user(connection, Sequelize);

connection.sync({force: false}).then(()=>{
    console.log('Tablas sincronizadas');
});

module.exports = {
    UserDAO
}
