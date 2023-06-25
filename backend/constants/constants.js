const { default: mongoose } = require('mongoose');
const http2 = require('node:http2');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const JWT_SECRET = 'secret-key';
const regexLink = /^(http|https):\/\/(www\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}?(?:\/\S*)?#?$/;

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
} = http2.constants;

const allowedCors = ['http://avibus-bonis.nomoreparties.sbs',
  'https://avibus-bonis.nomoreparties.sbs',
  'http://api.nomoreparties.sbs',
  'https://api.nomoreparties.sbs',
  'localhost:3000'];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const handleError = (err, next) => {
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError('Переданы некорректные данные'));
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return next(new NotFoundError('Элемент с таким _id не был найден'));
  }

  return next(err);
};

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  handleError,
  JWT_SECRET,
  regexLink,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
