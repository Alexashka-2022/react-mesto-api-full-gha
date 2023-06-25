const usersRouter = require('express').Router();
const usersControllers = require('../controllers/users');
const userValidation = require('../middlewares/validation');

usersRouter.get('/', usersControllers.getUsers);
usersRouter.get('/me', usersControllers.getCurrentUser);
usersRouter.get('/:userId', userValidation.getUserByIdValidation, usersControllers.getUserById);
usersRouter.patch('/me', userValidation.updateUserValidation, usersControllers.updateUser);
usersRouter.patch('/me/avatar', userValidation.updateAvatarValidation, usersControllers.updateAvatar);

module.exports = usersRouter;
