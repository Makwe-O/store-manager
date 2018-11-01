import express from 'express';
import Sale from '../controllers/Sale';
import Validate from '../middleware/validate';

const router = express.Router();
router.get('/', Sale.getAllSalesRecord);
router.get('/:id', Sale.getOneSalesRecord);
router.post('/', Validate.emptyValueSales, Sale.createSalesRecord);

export default router;
