const router = require('express').Router();
const { Todo } = require('../model/todo.js');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
    const result = await Todo.find();
    if (!result) {
        res.status(400).send({ Message: "No Todo find" });
    }
    return res.send(result);
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(rea.params.id)) {
        return res.status(400).send(`No Record found with id ${req.params.id}`);
    }

    Todo.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
    });
});

router.post('/', (req, res) => {
    let todo = new Todo({
        id: req.body.id,
        task: req.body.task,
        status: req.body.status
    });
    todo.save((err, doc) => {
        if (!err) {
            return res.send(doc);
        }
        else {
            return res.status(324).send(`Error occured`);
        }
    })
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record found with id ${req.params.id}`);
    }
    let todo = {
        id: req.body.id,
        task: req.body.task,
        status: req.body.status
    }
    Todo.findByIdAndUpdate(req.params.id, { $set: todo }, { new: true }, (err, doc) => {
        if (!err) {
            return res.send(doc);
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record found with id ${req.params.id}`);
    }

    Todo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
    });
});

module.exports = router;