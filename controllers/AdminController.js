const BaseController = require('./BaseController');
const adminUtil = require('../util/adminUtil');

module.exports = class AdminController extends BaseController {
    constructor(req, res, next) {
        super(req, res);
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async createAdmin() {
        try {
            const result = await adminUtil.createAdmin(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in createAdmin of file AdminController :: ', error);
            this.throwError(error);
        }
    }
}