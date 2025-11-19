const BaseController = require('./BaseController');
const userUtil = require('../util/userUtil');

module.exports = class UserController extends BaseController {
    constructor(req, res, next) {
        super(req, res);
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async registerUser() {
        try {
            const result = await userUtil.registerUser(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in registerUser of file UserController :: ', error);
            this.throwError(error);
        }
    }
    async login() {
        try {
            const result = await userUtil.login(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in login of file UserController :: ', error);
            this.throwError(error);
        }
    }
}