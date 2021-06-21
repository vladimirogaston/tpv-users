const HttpException = require("../../controllers/HttpException")

module.exports = (rol) => {
    return async function(req, res, next) {
        if(!rol.includes(req.body.token_role)) {
            throw new HttpException(403, 'Forbidden operation exception.')    
        }
        next()
    }
}