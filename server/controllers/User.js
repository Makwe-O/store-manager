import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

const User = {
  login(req, res) {
    const admin = { id: 3 };
    const token = jwt.sign({ admin }, 'my_secret_key');
    res.json({
      token,
    });
  },

  signup(req, res) {
    res.status(200).send({
      message: 'signup',
    });
  },
};
export default User;
