const cardsRouter = require('express').Router();
const cardsControllers = require('../controllers/cards');
const cardValidation = require('../middlewares/validation');

cardsRouter.get('/', cardsControllers.getCards);
cardsRouter.post('/', cardValidation.createCardValidation, cardsControllers.createCard);
cardsRouter.delete('/:cardId', cardValidation.checkCardIdValidation, cardsControllers.deleteCard);
cardsRouter.put('/:cardId/likes', cardValidation.checkCardIdValidation, cardsControllers.likeCard);
cardsRouter.delete('/:cardId/likes', cardValidation.checkCardIdValidation, cardsControllers.dislikeCard);

module.exports = cardsRouter;
