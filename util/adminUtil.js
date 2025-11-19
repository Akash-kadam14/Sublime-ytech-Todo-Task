const UserModel = require('../models/userModel');
const commonHelper = require('../helper/commonHelper');
const UserRole = require('../enumeration/UserRole');
async function createAdmin(req) {
    try {
       const reqBody = req.body;
        reqBody.role = UserRole.Admin;
       const exists = await UserModel.findOne({ email: reqBody.email, role: reqBody.role }).lean();
       if (exists) throw new Error ('Email already registered');
       reqBody.password = await commonHelper.hash(reqBody.password);
       const data = await UserModel.create(reqBody);
       return { message: 'Admin created'};
    } catch (error) {
       console.error('Error occurred in createUser of file awsUtil :: ', error);
       throw error;
    }
}

module.exports = {
    createAdmin
}