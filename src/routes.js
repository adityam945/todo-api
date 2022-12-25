const todoController = require("./controller/todo.controller");
const router = require("express").Router();


module.exports = (app) => {
    // create a recording
    router.post('/create', todoController.create);

};