import express from 'express';
import Sale from '../controllers/Sale';

const router = express.Router();
router.get('/', Sale.getAll);

export default router;