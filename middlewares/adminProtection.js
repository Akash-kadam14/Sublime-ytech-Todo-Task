// middlewares/adminProtection.js
const UserModel = require("../models/userModel");
const isAuthenticate = require("../middlewares/authenticate");
const UserRole = require("../enumeration/UserRole");

const isAdmin = (req, res, next) => {
    try {
        if (req.authUser.role !== UserRole.Admin) {
            throw new Error("Access denied: admin only");
        }
        next();
    } catch (error) {
        return res.status(403).json({
            code: 403,
            message: error.message,
            error: true
        });
    }
};


const adminProtection = async (req, res, next) => {
    try {
        const adminExists = await UserModel.findOne({ role: UserRole.Admin }).lean();

        if (!adminExists) {
            console.log("No admin exists → allowing first admin creation");
            return next();  // open route
        }

        // If admin exists → require login first
        isAuthenticate(req, res, function () {
            isAdmin(req, res, next);
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Server error",
            error: true
        });
    }
};

module.exports = adminProtection;
