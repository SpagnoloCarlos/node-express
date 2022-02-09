const express = require('express');
const userController = require('../controllers/userController');

const userValidationSchema = require('../validationSchemas/userValidationSchema');
const validator = require('express-joi-validation').createValidator();

const routes = (User) => {
  const userRouter = express.Router();

  const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken } = userController(User);

  userRouter.route('/users')
    .get(getUsers)
    .post(validator.body(userValidationSchema), postUsers);

  userRouter.route('/users/:userId')
    .get(getUserById)
    .put(putUsers)
    .delete(deleteUserById);

  userRouter.route('/users/login')
    .post(postLogin)

  userRouter.route('/users/login/validate')
    .get(validateToken)

  return userRouter;
};

module.exports = routes;