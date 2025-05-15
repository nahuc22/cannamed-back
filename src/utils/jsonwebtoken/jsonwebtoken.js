const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d"}
    )
}

module.exports =  getToken 