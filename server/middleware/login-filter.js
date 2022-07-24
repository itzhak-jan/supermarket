const jwt_decode = require('jwt-decode');

async function loginFilter(req, res, next) {
    try {
        let token =  req.headers.authorization
        const userDetails = jwt_decode(token);
        req.body.token = userDetails;
        next();
    }
    catch (e) {
        console.error(e);
        res.status(403).send(e.message)
    }

}

module.exports = loginFilter;