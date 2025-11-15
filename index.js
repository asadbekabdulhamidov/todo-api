// import express
const express = require('express');

// data todos.js import
const todos = require('./data/todos');

// app
const app = express();

// port
const PORT = 8080;
// bu post put patch bilan keladigan req.bodylarni oqish uchun moljallangan middleware
app.use(express.json());

// oddiy get
app.get('/', (req, res) => {
  res.send('TODO-ishlamoqda');
});

// get todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  // bizga sorovda kelgan idni olamz va bir yola Numberga otkazib olamz chnkki bizga u string korinishida keladi
  let todoId = Number(req.params.id);
  // todos ichidan osha todoni ajratib olamz
  const findTodo = todos.find((t) => t.id === todoId);

  // Agar topilmasa
  if (!findTodo) {
    return res.status(404).json({ message: 'Todo topilmadi', status: 404 });
  }
  //   topilsa qaytaramz
  res.json(findTodo);
});

// post bu yangi todo qoshish uchun
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title)
    return res.status(400).json({
      message: 'title majburiy',
      status: 400,
    });
  // kelayotgan malumotdan yangi todo yasab olish bizga faqat title keladi holos
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    title,
    completed: false,
  };

  //   todoni todos arrayga qoshish
  todos.push(newTodo);

  // Javob qaytaramiz
  res.status(201).json({
    message: 'Succes todo',
    status: 201,
  });
});

// serverni ishga tushurish

app.listen(PORT, () => {
  console.log(`server http://localhost:${PORT} da ishlamoqda`);
});
