const jwt = require('jsonwebtoken');

const signToken = (id, secret, expiresIn) => {
    return jwt.sign(
        { id },
        secret,
        { expiresIn }
    )
}

const generateAccessToken = (user) => {
    const expiresIn = 12 * 60 * 60 * 1000;
    return signToken(user.id, process.env.JWT_SECRET, expiresIn);
}

module.exports = {
    generateAccessToken
}