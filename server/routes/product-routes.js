import express from 'express';
import Product from '../controllers/Product';

function ensureToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({ message: 'You do not have Permission' });
  }
}

const router = express.Router();
router.get('/', Product.getAll);
router.get('/:id', Product.getOne);
router.post('/', ensureToken, Product.create);

export default router;
