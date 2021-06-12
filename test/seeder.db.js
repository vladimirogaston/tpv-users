const fs = require('fs')
const yaml = require('js-yaml')
const bcrypt = require('bcryptjs')
const { UserDAO } = require('../src/models/user.model')

module.exports = () => {
    try {
        let fileContents = fs.readFileSync('./test/data.yaml', 'utf8')
        let dataFile = yaml.safeLoad(fileContents)
        let data = []
        data = dataFile.Users;
        data.forEach((obj) => {
            bcrypt.hash(obj.password, 8).then(value=> {
                const entity = {
                    username: obj.username,
                    password: value,
                    role: obj.role
                }
                UserDAO.create(entity).then(value=>{
                    console.log(value)
                })
            })
        })
    } catch (e) {
        console.log(e);
    }
}