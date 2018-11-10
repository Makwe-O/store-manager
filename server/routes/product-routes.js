import express from 'express';
import Product from '../controllers/Product';
import Validate from '../middleware/validate';
import Authenticate from '../middleware/auth';

const router = express.Router();
router.get('/', Product.getAllProduct);
router.get('/:id', Product.getOneProduct);
router.post('/', Authenticate.ensureToken, Validate.emptyValueProduct, Validate.checkRoleAdmin, Product.createProduct);
router.put('/:id', Authenticate.ensureToken, Validate.checkRoleAdmin, Product.modifyProduct);
router.delete('/:id', Authenticate.ensureToken, Validate.checkRoleAdmin, Product.deleteProduct);

export default router;
