const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = process.env;

async function jwtSign(user) {
    try {
        const userData = user;
        userData.userId = user._id;

        const token = jwt.sign(userData, JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    } catch (error) {
        console.error('Error occured in jwtSign of file commonHelper :: ', error);
        throw error;
    }
}

async function hash(password) {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
}
async function comparePassword(password, hashedPassword) {
    const comparisonResult = await bcrypt.compare(password, hashedPassword);
    return comparisonResult;
}
module.exports = {
    jwtSign,
    hash,
    comparePassword
}