require('dotenv').config();
const app = require('./api');

const controllerLogin = require('./controllers/loginController');
const controllerUser = require('./controllers/userController');
const controllerCategory = require('./controllers/categoryController');
const controllerPost = require('./controllers/postController');

const validateLogin = require('./middlewares/loginValidation');
const validateUser = require('./middlewares/userValidation');
const validateCategory = require('./middlewares/categoryValidation');
const validatePost = require('./middlewares/postValidation');
const auth = require('./auth/validateJMT');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin.checkLogin, controllerLogin.login);

app.post('/user', validateUser.checkUser, controllerUser.addUser);

app.post(
  '/categories',
  validateCategory.checkCategory, 
  auth.validateJMT,
  controllerCategory.addCategory,
  );

app.post('/post', auth.validateJMT, validatePost.checkPost, controllerPost.addPost);

app.get('/user', auth.validateJMT, controllerUser.findAll);

app.get('/user/:id', auth.validateJMT, controllerUser.findByPk);

app.get('/categories', auth.validateJMT, controllerCategory.findAll);

app.listen(port, () => console.log('ouvindo porta', port));
