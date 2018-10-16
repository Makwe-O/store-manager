import ProductModel from '../models/Product';

const Product = {
  getAll(req, res) {
    const products = ProductModel;
    return res.send(products);
  },
};
export default Product;
