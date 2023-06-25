const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');
const BadRequestError = require('../errors/BadRequestError');

const { regexLink } = require('../constants/constants');

/* валидация электронной почты с помощью validator */
const validateEmail = (email) => {
  const isValid = isEmail(email);
  if (isValid) {
    return email;
  }
  throw new BadRequestError('Введен некорректный email');
};

/* валидация информациии при регистрации */
const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexLink),
  }),
});

/* валидация информации при авторизации */
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(4),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

/* валидация информации при изменении пользователя */
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

/* валидация при изменении аватара */
const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexLink),
  }),
});

/* валидация создания карточки */
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexLink),
  }),
});

/* валидация id карточки */
const checkCardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation,
  checkCardIdValidation,
};
