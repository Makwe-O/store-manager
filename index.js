import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import expressValidator from 'express-validator';
import product from './server/routes/product-routes';
import sale from './server/routes/sale-routes';
import user from './server/routes/user-routes';
import category from './server/routes/categories-routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('UI'));
app.use(expressValidator());
// Routes to handle requests
app.use('/api/v1/products', product);
app.use('/api/v1/sales', sale);
app.use('/api/v1/auth', user);
app.use('/api/v1/categories', category);

app.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to store manager' });
});


// Handle unknown routes
app.use((req, res, next) => {
  const error = new Error('Url does not currently exist');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message,
  });
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
export default server;
