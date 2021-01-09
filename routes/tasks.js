const express =  require("express");
const { register ,login_u} = require("./index");
let router = express.Router();
let task = require("../controllers/TaskController.js");
const { login } = require("../controllers/TaskController.js");

//Get all tasks
router.get('/', (req,res) => {
  task.list(req,res);

});

// //register
router.get('/register',(req, res) => {
  task.register(req, res);
});

router.post('/register_user',register);

// //login
router.get('/login',(req, res) => {
  task.login(req, res);
});
router.post('/login_user',login_u);



//Get single task by id
router.get('/show/:id', (req, res) => {
  task.show(req, res);
});

//create a task
router.get('/create',(req, res) => {
  task.create(req, res);
});

//save a task
router.post('/save', (req, res) => {
  task.save(req, res);
});

//edit a task
router.get('/edit/:id',(req, res) => {
  task.edit(req, res);
});


//update a task
router.post('/update/:id',(req, res) => {
  task.update(req, res);
});

//delete a task
router.post('/delete/:id',(req, res) => {
  task.delete(req, res);
});

module.exports = router;
