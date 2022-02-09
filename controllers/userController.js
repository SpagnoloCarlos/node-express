const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersController = (User) => {
  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);

    res.json(response);
  }

  const postUsers = async (req, res) => {
    const user = new User(req.body);

    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    res.json(user);
  }

  const getUserById = async (req, res) => {
    const { params } = req;
    const response = await User.findById(params.userId);

    res.json(response);
  }

  const putUsers = async (req, res) => {
    const { body } = req;

    const response = await User.updateOne({
      _id: req.params.userId,
    }, {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        password: await bcrypt.hash(body.password, 10),
        email: body.email,
        address: body.address,
        phone: body.phone
      },
    });

    res.json(response);
  }

  const deleteUserById = async (req, res) => {
    const id = req.params.userId;

    await User.findByIdAndDelete(id);
    res.status(202).json('The user has been successfully deleted');
  }

  const postLogin = async (req, res) => {
    const { body } = req;
    const userDb = await User.findOne({ "userName": body.userName });

    if (userDb && await bcrypt.compare(body.password, userDb.password)){

      const token = createToken(userDb);

      res.status(200).json({
        message: "Valid credentials",
        token
      });

    }else{
      res.status(401).json({message: 'Invalid credentials'});
    }    
  }

  const createToken = userDb => {
    const payload = {
      firstName: userDb.firstName,
      lastName: userDb.lastName,
      userName: userDb.userName
    }

    return jwt.sign(payload, 'secret', { expiresIn: '1m'});
  }

  const validateToken = async (req, res) => {
    const { body } = req;
    const token = body.token;

    try{
      const decoded = await jwt.verify(token, 'secret');
      res.json(decoded);
      
    }catch (err){
      res.status(403).json({ message: "Invalid Token"});
    } 
  }

  return { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken };
}

module.exports = usersController;