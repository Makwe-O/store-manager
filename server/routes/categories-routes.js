import express from 'express';
import expressValidator from 'express-validator';
import Category from '../controllers/Category';
import Validate from '../middleware/validate';
import Authenticate from '../middleware/auth';


const router = express.Router();
router.get('/', Category.getAllCategory);
router.get('/:id', Category.getOneCategory);
router.post('/', Authenticate.ensureToken, Validate.emptyValueCategory, Category.createCategory);
router.put('/:id', Authenticate.ensureToken, Validate.emptyValueCategory, Category.modifyCategory);
router.delete('/:id', Authenticate.ensureToken, Category.deleteCategory);

export default router;
