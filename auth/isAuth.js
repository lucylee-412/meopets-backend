const jwt = require('jsonwebtoken');

// token verifying middleware. Present on every route that needs to be protected.

module.exports = (req, res, next) => {
    /* We get the token from the request header (if it's there)
       Then decode it, verifying it in the process. If all went well - proceed, also depositing 
       the payload (userId) into the request to be used by later requests the might need it
       Otherwise - throw the appropriate error. */
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('No token provided.');
        error.statuscode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch(err) {
        err.statuscode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not Authenticated.');
        error.statuscode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}