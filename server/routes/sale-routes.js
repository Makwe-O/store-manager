import express from 'express';
import Sale from '../controllers/Sale';
import Validate from '../middleware/validate';

const router = express.Router();
router.get('/', Sale.getAll);
router.get('/:id', Sale.getOne);
router.post('/', Validate.emptyValueSales, Sale.create);

export default router;
