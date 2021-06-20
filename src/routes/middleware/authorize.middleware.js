const HttpException = require("../../controllers/HttpException")

module.exports = (req) => {
    return async (req, res, next) => {
        if(req.params.id === req.body.id) {
            next()
        }
        throw new HttpException(403, 'Forbidden operation exception')
    }
}