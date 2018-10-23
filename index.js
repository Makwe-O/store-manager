import express from 'express';
import jwt from 'jsonwebtoken';
import product from './server/routes/product-routes';
import sale from './server/routes/sale-routes';


const app = express();
app.use(express.json());
app.use('/api/v1/products', product);
app.use('/api/v1/sales', sale);

app.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to store manager' });
});
app.post('/api/v1/login', (req, res) => {
  const admin = { id: 3 };
  const token = jwt.sign({ admin }, 'my_secret_key');
  res.json({
    token,
  });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
export default server;