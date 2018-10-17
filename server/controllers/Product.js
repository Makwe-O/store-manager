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
};
export default Product;
