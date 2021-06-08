const HttpException = require("./HttpException")

module.exports = (userRole) => {
    return function(req, res, next) {
        if(req.body.role == userRole) {
            next()
        }
        throw new HttpException(403, 'Forbidden operation exception')
    }
}