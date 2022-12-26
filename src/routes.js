const todoController = require("./controller/todo.controller");
const router = require("express").Router();

router.route('/create').post(todoController.create);
router.route('/get').get(todoController.getAll);



module.exports = router