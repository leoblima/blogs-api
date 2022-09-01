require('dotenv').config();
const app = require('./api');
const controllerLogin = require('./controllers/loginController');
const controllerUser = require('./controllers/userController');
const validateLogin = require('./middlewares/loginValidation');
const validateUser = require('./middlewares/userValidation');
const auth = require('./auth/validateJMT');
// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validateLogin.checkLogin, controllerLogin.login);

app.post('/user', validateUser.checkUser, controllerUser.addUser);

app.get('/user', auth.validateJMT, controllerUser.findAll);

app.listen(port, () => console.log('ouvindo porta', port));
