const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersController = (User) => {
  const getAllUsers = async (req, res) => {
    const {query} = req;
    const allUsers = await User.find(query);

    res.json(allUsers);
  };

  const postUsers = async (req, res) => {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.json(user);
  };

  const getUsersById = async (req, res) => {
    try {
      const {params} = req;
      const userDb = await User.findById(params.userId);

      res.json(userDb);
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'User not found',
      });
    }
  };

  const putUsers = async (req, res) => {
    try {
      const {body} = req;

      const userUpdate = await User.updateOne({
        _id: req.params.userId,
      }, {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          userName: body.userName,
          password: await bcrypt.hash(body.password, 10),
          email: body.email,
          address: body.address,
          phone: body.phone,
        },
      });

      res.json(userUpdate);
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'User not found',
      });
    }
  };

  const deleteUsersById = async (req, res) => {
    try {
      const userId = req.params.userId;
      await User.findByIdAndDelete(userId);

      res.json('The user has been successfully deleted');
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'User not found',
      });
    }
  };

  const getUsersByUserName = async (req, res) => {
    const {query} = req;
    const userDb = await User.findOne({'userName': query.userName});

    if (userDb) {
      res.json(userDb);
    } else {
      res.json({'message': 'User not found'});
    }
  };

  const postLoginUsers = async (req, res) => {
    const {body} = req;
    const userDb = await User.findOne({'userName': body.userName});

    if (userDb && await bcrypt.compare(body.password, userDb.password)) {
      const token = createToken(userDb);

      res.json({
        message: 'Valid credentials',
        token,
      });
    } else {
      res.json({message: 'Invalid credentials'});
    }
  };

  const createToken = (userDb) => {
    const payload = {
      firstName: userDb.firstName,
      lastName: userDb.lastName,
      userName: userDb.userName,
    };

    return jwt.sign(payload, 'secret', {expiresIn: '1h'});
  };

  return {getAllUsers, postUsers, getUsersById, putUsers, deleteUsersById, getUsersByUserName, postLoginUsers};
};

module.exports = usersController;
