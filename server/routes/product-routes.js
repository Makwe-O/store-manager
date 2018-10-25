import express from 'express';
import Product from '../controllers/Product';
import Validate from '../middleware/validate';
import Authenticate from '../middleware/auth';

const router = express.Router();
router.get('/', Product.getAll);
router.get('/:id', Product.getOne);
router.post('/', Authenticate.ensureToken, Validate.emptyValueProduct, Product.create);

export default router;