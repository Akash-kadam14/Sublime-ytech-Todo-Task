const express = require('express');

const router = express.Router();
const isAuthorize = require('../middlewares/authorize');
const UserRole = require('../enumeration/UserRole');

const validator = require('../middlewares/validateSchema');

const schemas = require('../validator/schemas');
const TodoController = require('../controllers/TodoController');

router.post('/createTodo', isAuthorize([UserRole.User]), validator.bodyData(schemas.createTodo),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.createTodo()
}
);

router.put('/updateTodo', isAuthorize([UserRole.User]), validator.queryData(schemas.commonIdQuery),
validator.bodyData(schemas.updateTodo),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.updateTodo()
}
);

router.get('/getMyTodos', isAuthorize([UserRole.User]), validator.queryData(schemas.paginationQuery),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.getMyTodos()
}
);

router.get('/getTodoById', isAuthorize([UserRole.User, UserRole.Admin]), validator.queryData(schemas.commonIdQuery),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.getTodoById()
}
);

router.get('/listAllTodos', isAuthorize([UserRole.Admin]), validator.queryData(schemas.paginationQuery),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.listAllTodos()
}
)
router.delete('/deleteTodo', isAuthorize([UserRole.Admin, UserRole.User]), validator.queryData(schemas.commonIdQuery),
async (req, res, next) => {
    const todo = new TodoController(req, res, next);
    todo.deleteTodo()
}
)
module.exports = router;