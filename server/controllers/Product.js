import ProductModel from '../models/Product';

const Product = {
  getAll(req, res) {
    const products = ProductModel;
    return res.send(products);
  },
  getOne(req, res) {
    const { id } = req.params;
    let found = false;
    const product = ProductModel;
    product.Products.forEach((item) => {
      if (item.id === id) {
        found = true;
        return res.json(item);
      }
    });
    if (!found) {
      res.status(404).json('Product not found');
    }
  },
  create(req, res) {
    const { name, price, quantity } = req.body;
    const product = ProductModel;
    product.Products.push({
      id: '3',
      name: name,
      price: price,
      quantity: quantity,
    });
    res.json(product.Products[product.Products.length - 1]).status(201);
  },
};
export default Product;
