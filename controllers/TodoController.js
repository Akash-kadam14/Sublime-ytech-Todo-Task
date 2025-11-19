const BaseController = require('./BaseController');
const todoUtil = require('../util/todoUtil');

module.exports = class TodoController extends BaseController {
    constructor(req, res, next) {
        super(req, res);
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async createTodo() {
        try {
            const result = await todoUtil.createTodo(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in createTodo of file TodoController :: ', error);
            this.throwError(error);
        }
    }
    async updateTodo() {
        try {
            const result = await todoUtil.updateTodo(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in updateTodo of file TodoController :: ', error);
            this.throwError(error);
        }
    }
    async getMyTodos() {
        try {
            const result = await todoUtil.getMyTodos(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in getMyTodos of file TodoController :: ', error);
            this.throwError(error);
        }
    }
    async getTodoById() {
        try {
            const result = await todoUtil.getTodoById(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in getTodoById of file TodoController :: ', error);
            this.throwError(error);
        }
    }
    async listAllTodos() {
        try {
            const result = await todoUtil.listAllTodos(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in listAllTodos of file TodoController :: ', error);
            this.throwError(error);
        }
    }
    async deleteTodo() {
        try {
            const result = await todoUtil.deleteTodo(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in deleteTodo of file TodoController :: ', error);
            this.throwError(error);
        }
    }
}