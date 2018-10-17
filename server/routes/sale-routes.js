import express from 'express';
import Sale from '../controllers/Sale';

const router = express.Router();
router.get('/', Sale.getAll);
router.get('/:id', Sale.getOne);
router.post('/', Sale.create);

export default router;