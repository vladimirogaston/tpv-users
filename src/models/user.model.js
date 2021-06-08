module.exports = (sequelize, type)=>{
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
        },
        role: {
            type: type.STRING,
            allowNull: false
        }
    })
}