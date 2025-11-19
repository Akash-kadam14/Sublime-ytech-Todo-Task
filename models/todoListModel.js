const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const todoSchema =  mongoose.Schema(
{
    title: { 
        type: String, 
        trim: true, 
        required: true 
    },
    userId: { 
        type: Number, 
        ref: 'Users', 
        required: true 
    },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, 

{
    _id: false,
    timestamps: true
}
);
todoSchema.index({ userId: 1, title: 1 }, { unique: true });
todoSchema.plugin(AutoIncrement, {
    id: "todo",
    inc_field: "_id",
    start_seq: 1,
});

module.exports = mongoose.model('Todo', todoSchema);