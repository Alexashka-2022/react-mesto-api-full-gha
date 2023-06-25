const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userModel = require('../models/user');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  handleError,
  JWT_SECRET,
} = require('../constants/constants');

/* получить список пользователей */
const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => {
      res.status(HTTP_STATUS_OK).send(users);
    }).catch(next);
};

/* получение пользователя по Id */
const getUserById = (req, res, next) => {
  userModel.findById(req.params.userId).orFail()
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(HTTP_STATUS_OK).send(user);
      }
    }).catch((err) => {
      handleError(err, next);
    });
};

/* текущий пользователь */
const getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(HTTP_STATUS_OK).send(user);
      }
    }).catch((err) => {
      handleError(err, next);
    });
};

/* регистрация пользователя */
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.status(HTTP_STATUS_CREATED).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        }).catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует!'));
          }
          handleError(err, next);
        });
    }).catch(next);
};

/* авторизация пользователя */
const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неверно переданный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неверно переданный email или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    }).catch(next);
};

/* изменение информации о пользователе */
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => {
    res.status(HTTP_STATUS_OK).send(user);
  }).catch((err) => {
    handleError(err, next);
  });
};

/* изменение аватара пользователя */
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).then(() => {
    res.status(HTTP_STATUS_OK).send({ avatar });
  }).catch((err) => {
    handleError(err, next);
  });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
