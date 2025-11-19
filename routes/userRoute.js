const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');
const validator = require('../middlewares/validateSchema');
const schema = require('../validator/schemas');



router.post('/registerUser', validator.bodyData(schema.registerUser),
async(req, res, next) => {
    const user = new UserController(req, res, next);
    user.registerUser();
});

router.post('/login', validator.bodyData(schema.login),
async(req, res, next) => {
    const user = new UserController(req, res, next);
    user.login();
});

module.exports = router;