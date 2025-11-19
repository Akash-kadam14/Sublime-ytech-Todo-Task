// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminProtection = require("../middlewares/adminProtection");
const validator = require('../middlewares/validateSchema');
const AdminController  = require("../controllers/AdminController");
const schema = require('../validator/schemas');

router.post('/createAdmin', adminProtection, validator.bodyData(schema.registerUser),
async(req, res, next) => {
    const user = new AdminController(req, res, next);
    user.createAdmin();
});

module.exports = router;
