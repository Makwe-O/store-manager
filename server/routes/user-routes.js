import express from 'express';
import User from '../controllers/User';
import Validate from '../middleware/validate';

const router = express.Router();
router.post('/login', User.login);
router.post('/signup', Validate.validateSignup, User.signup);
export default router;
