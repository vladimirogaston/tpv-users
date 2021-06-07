const HttpException = require('./HttpException')

const authorize = (role) => {
    return async function(req, res, next) {
        if(req.body.role !== role) throw new HttpException(403, 'Forbidden operation exception')
        next()
    }
}

module.exports = authorize