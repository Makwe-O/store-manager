import express from 'express';
import product from './server/routes/product-routes';

const app = express();
app.use(express.json());
app.use('/api/v1/products', product);

app.get('/api/v1', (req, res) => {
  res.send({ message: 'welcome to store manager' });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
export default server;