import express from 'express';
import jwt from 'jsonwebtoken';
import product from './server/routes/product-routes';
import sale from './server/routes/sale-routes';
import user from './server/routes/user-routes';


const app = express();
app.use(express.json());
// Routes to handle requests
app.use('/api/v1/products', product);
app.use('/api/v1/sales', sale);
app.use('/api/v1/auth', user);

app.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to store manager' });
});


// Handle unknown routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
export default server;
