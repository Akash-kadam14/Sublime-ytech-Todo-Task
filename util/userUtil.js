const UserModel = require('../models/userModel');
const commonHelper = require('../helper/commonHelper');
const UserRole = require('../enumeration/UserRole');
async function registerUser(req) {
    try {
       const reqBody = req.body;
        reqBody.role = UserRole.User;
       const exists = await UserModel.findOne({ email: reqBody.email, role: UserRole.User }).lean();
       if (exists) throw new Error ('Email already registered');
       reqBody.password = await commonHelper.hash(reqBody.password);
       const data = await UserModel.create(reqBody);
       return { message: 'User registered', data };
    } catch (error) {
       console.error('Error occurred in createUser of file userUtil :: ', error);
       throw error;
    }
}

async function login(req) {
    try {
        const { email, password } = req.body;
        const getUser = await UserModel.findOne({ email }).lean();
        if(!getUser) throw new Error('Inavalid credential')
        const validatePassword = await commonHelper.comparePassword(password, getUser.password);
        if(!validatePassword) throw new Error('Invalid Password');
        const token = await commonHelper.jwtSign(getUser);
        return {message: 'Login successful', token};
    } catch (error) {
        console.error('Error occurred in login of file userUtil :: ', error);
        throw error; 
    }
}
module.exports = {
    registerUser,
    login
}