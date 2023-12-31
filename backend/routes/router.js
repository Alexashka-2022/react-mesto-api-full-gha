const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
