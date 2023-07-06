const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            response: `Access denied.`,
        });
    }
    try {
        const newToken = token.replace("\"", "");
        const verifiedUser = jwt.verify(newToken, process.env.JWT_SECRET)
        if (!verifiedUser) {
            return res.status(401).json({
                status: 'fail',
                response: `You must be logged in.`,
            });
        }

        req.user = verifiedUser.id;
        next();
    } catch (error) {
        res.status(400).json({
            status: 500,
            response: error,
        });
    }
}

module.exports = authToken;