const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const {mongoose} = require("./db.js");
const todoController = require('./controller/todoController.js');

const app = express();

app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("App is running on http://localhost:3000");
});

app.use("/todolist",todoController);