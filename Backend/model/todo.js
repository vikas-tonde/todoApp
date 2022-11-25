const mongoose = require("mongoose");

const Todo = mongoose.model('Todo', {
    id: { type: Number },
    task: { type: String },
    status: { type: Boolean }
});

module.exports = { Todo };