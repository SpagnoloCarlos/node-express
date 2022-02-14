const express = require('express');
const userController = require('../controllers/userController');
const userValidationSchema = require('../validationSchemas/userValidationSchema');
const validator = require('express-joi-validation').createValidator();

const routes = (User) => {
  const userRouter = express.Router();

  const {getAllUsers, postUsers, getUsersById, putUsers, deleteUsersById, getUsersByUserName, postLoginUsers} = userController(User);

  userRouter.route('/users')
      .get(getAllUsers)
      .post(validator.body(userValidationSchema.userSchema), postUsers);

  userRouter.route('/users/:userId')
      .get(getUsersById)
      .put(validator.body(userValidationSchema.userSchema), putUsers)
      .delete(deleteUsersById);

  userRouter.route('/searchUsers')
      .get(validator.query(userValidationSchema.queryUserSchema), getUsersByUserName);

  userRouter.route('/users/login')
      .post(validator.body(userValidationSchema.userLoginSchema), postLoginUsers);

  return userRouter;
};

module.exports = routes;
