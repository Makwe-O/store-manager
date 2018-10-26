import ProductModel from '../models/Product';

const Product = {
  getAllProduct(req, res) {
    const products = ProductModel;
    return res.status(200).send(products);
  },
  getOneProduct(req, res) {
    const { id } = req.params;
    let found = false;
    const product = ProductModel;
    product.Products.forEach((item) => {
      if (item.id === id) {
        found = true;
        return res.status(200).json(item);
      }
    });
    if (!found) {
      res.status(404).json('Product not found');
    }
  },
  createProduct(req, res) {
    const { id, name, price, quantity } = req.body;
    const product = ProductModel;
    product.Products.push({
      id,
      name,
      price,
      quantity,
    });
    res.status(201).send(product);
  },
  modifyProduct(req, res) {
    res.status(200).send({
      message: 'Updated product',
    });
  },
  deleteProduct(req, res) {
    res.status(200).send({
      message: 'Product deleted',
    });
  },
};
export default Product;
