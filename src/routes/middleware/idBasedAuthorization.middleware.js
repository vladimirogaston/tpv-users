const HttpException = require("../../controllers/HttpException")

module.exports = () => {
    return async function(req, res, next) { 
        const FORBIDDEN_OPERATION = (Number(req.params.id) != Number(req.body.token_id))
        if(FORBIDDEN_OPERATION) {
            throw new HttpException(403, 'Forbidden operation exception.')
        }
        next()
    }
}