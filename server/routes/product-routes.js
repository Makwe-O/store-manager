import express from 'express';
import Product from '../controllers/Product';

const router = express.Router();
router.get('/', Product.getAll);
router.get('/:id', Product.getOne);

export default router;