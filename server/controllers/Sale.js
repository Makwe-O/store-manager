import SaleModel from '../models/Sale';

const Sale = {
  getAll(req, res) {
    const sales = SaleModel;
    return res.send(sales);
  },

  getOne(req, res) {
    const { id } = req.params;
    let found = false;
    const product = SaleModel;
    product.Sales.forEach((item) => {
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
export default Sale;
