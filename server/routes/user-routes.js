import express from 'express';
import User from '../controllers/User';
import Validate from '../middleware/validate';

const router = express.Router();
router.post('/', User.login);
router.post('/', User.signup);
export default router;
