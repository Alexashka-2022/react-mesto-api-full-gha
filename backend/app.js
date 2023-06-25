require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/router');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const { registerValidation, loginValidation } = require('./middlewares/validation');

const { serverError } = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://0.0.0.0:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Соединение с MongoDB установлено успешно');
  }).catch((err) => {
    console.log(err);
  });

const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
