import SaleModel from '../models/Sale';

const Sale = {
  getAll(req, res) {
    const sales = SaleModel;
    return res.send(sales);
  },
};
export default Sale;
