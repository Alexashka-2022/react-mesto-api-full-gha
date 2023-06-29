const cardModel = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  handleError,
} = require('../constants/constants');

/* получить список карточек */
const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => {
      res.status(HTTP_STATUS_OK).send(cards);
    }).catch(next);
};

/* создание карточки */
const createCard = (req, res, next) => {
  cardModel.create({
    owner: req.user._id,
    ...req.body,
  }).then((card) => {
    res.status(HTTP_STATUS_CREATED).send(card);
  }).catch(next);
};

/* удаление карточки с проверкой */
const deleteCard = (req, res, next) => {
  const userId = req.user._id;

  cardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      if (card.owner.toString() !== userId) {
        return next(new ForbiddenError('У вас недостаточно прав для удаления карточки'));
      }
      return cardModel.deleteOne(card).then(() => res.status(HTTP_STATUS_OK).send({ message: 'Карточка успешно удалена' }));
    }).catch((err) => handleError(err, next));
};

/* лайк карточки */
const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    /* $addToSet - добавляет элемент в массив, если его там ещё нет */
    { $addToSet: { likes: req.user._id } },
    /* new: true - возвращает измененный документ, а не оригинал. По умолчанию - false */
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFoundError('Передан несуществующий _id карточки'));
    }
    return res.status(HTTP_STATUS_CREATED).send(card);
  }).catch((err) => {
    handleError(err, next);
  });
};

/* удаление лайка карточки */
const dislikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    /* $pull - убирает элемент из массива */
    { $pull: { likes: req.user._id } },
    /* new: true - возвращает измененный документ, а не оригинал. По умолчанию - false */
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFoundError('Передан несуществующий _id карточки'));
    }
    return res.status(HTTP_STATUS_OK).send(card);
  }).catch((err) => {
    handleError(err, next);
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
