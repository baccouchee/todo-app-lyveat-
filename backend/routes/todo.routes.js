const router = require('express').Router();
let Todos = require('../models/todo.model');

router.route('/').get((req, res) => {
    Todos.find()
    .then(todoss => res.json(todoss))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const date = Date.parse(req.body.date);

  const newTodos = new Todos({
    username,
    description,
    date,
  });

  newTodos.save()
  .then(() => res.json('Todos added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Todos.findById(req.params.id)
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Todos.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todos deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Todos.findById(req.params.id)
    .then(todos => {
      todos.username = req.body.username;
      todos.description = req.body.description;
      todos.date = Date.parse(req.body.date);

      todos.save()
        .then(() => res.json('Todos updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;