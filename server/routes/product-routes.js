import express from 'express';
import Product from '../controllers/Product';
import Validate from '../middleware/validate';
import Authenticate from '../middleware/auth';

const router = express.Router();
router.get('/', Product.getAllProduct);
router.get('/:id', Product.getOneProduct);
router.post('/', Authenticate.ensureToken, Validate.emptyValueProduct, Product.createProduct);
router.put('/:id', Product.modifyProduct);
router.delete('/:id', Product.deleteProduct);

export default router;
