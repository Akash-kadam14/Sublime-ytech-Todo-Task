const UserRole = require('../enumeration/UserRole');
const TodoModel = require('../models/todoListModel');

async function createTodo(req) {
    try {
        const reqBody = req.body;
        reqBody.userId = req.authUser._id
        
        // Check for duplicate todo (same title for same user)
        const duplicateTodo = await TodoModel.findOne({ 
            title: reqBody.title, 
            userId:  reqBody.userId
        }).lean();

        if (duplicateTodo) {
            throw new Error("You already created this todo")
        }
        await TodoModel.create(reqBody);
        return { message: 'task created'}
        } catch (error) {
        console.error(error);
        throw error;
        }
}

async function updateTodo(req) {
    try {
        const reqBody = req.body
        const {userId} = req.authUser;
    const todo = await TodoModel.findOne({_id: +req.query._id, userId}, { _id: 1, completed: 1}).lean();
    if (!todo) throw new Error ('Todo not found');
    const setObject = {}
    const fields = [
        'title',
        'description',
        'completed'
      ];
      fields.forEach((field) => {
        if (reqBody[field] !== undefined) {
          setObject[field] = reqBody[field];
        }
      });
      if (Object.keys(setObject).length > 0) {
        const info = {
          $set: setObject,
        };
        await TodoModel.updateOne({ _id : { $eq: todo._id }, userId }, info);
    }
    return { message: 'Task updated successfully!'}
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get all todos User Specific
 async function getMyTodos(req)  {
    try {
        const { userId } = req.authUser;
        let { pageNumber = 1, limit = 10} = req.query; 
        const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 }).skip(pageNumber > 0 ? (pageNumber - 1) * limit : 0).limit(limit);
    return todos
    } catch (error) {
        console.error(error);
        throw error
    }
    };
    
    
    // get single todo (ensure owner or admin can view)
 async function getTodoById (req) {
    try {
        const { _id } = req.query;
        const {userId, role } = req.authUser;

        const todo = await TodoModel.findById(_id).lean();
    
        if (!todo) throw new Error ('Todo not found');
        if (role === UserRole.User && todo.userId !== userId) {
            throw new Error('You are not allowed to access this todo')
        }
        return todo;
    } catch (error) {
        console.error(error);
        throw error
    }
};

// admin-only: list all todos
async function listAllTodos (req)  {
    try {
        let { pageNumber = 1, limit = 10} = req.query; 
        const allTodos = await TodoModel.find().populate('userId', 'email name role').sort({ createdAt: -1 }).skip(pageNumber > 0 ? (pageNumber - 1) * limit : 0).limit(limit).lean();
        return allTodos;
    } catch (error) {
        console.error(error);
        throw error
    }
};

// delete todo (owner or admin)
async function deleteTodo(req) {
    try {
        const {userId, role } = req.authUser;
        const todo = await TodoModel.findById(req.query._id).lean();
        if (!todo) throw new Error ('Todo not found');
        if (role === UserRole.User && todo.userId !== userId) {
            throw new Error('You are not allowed to perform this action')
        }
        await TodoModel.deleteOne({ _id: { $eq: todo._id } });
        return { message: 'Task deleted' };
    } catch (error) {
        console.error(error);
        throw error
    }
    };
module.exports = {
    createTodo,
    updateTodo,
    getMyTodos,
    getTodoById,
    listAllTodos,
    deleteTodo,
}