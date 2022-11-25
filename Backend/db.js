const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vikas:vikaS123@cluster0.iwwbr.mongodb.net/todo-app?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("Database Connected successfully");
    }
    else {
        console.log("Error while connecting to database");
    }
});

module.exports = { mongoose };
