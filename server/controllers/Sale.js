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
      res.status(404).json('Sales record not found');
    }
  },
  create(req, res) {
    const { id, productName, price, buyersName, amount } = req.body;
    const product = SaleModel;
    if (!productName || !price || !buyersName || !amount) {
      console.log(productName, price, buyersName, amount)
      res.status(400).send({ message: 'Error, One or more feilds are blank' });
    } else {
      product.Sales.push({
        id,
        productName,
        price,
        buyersName,
        amount,
      });
      res.status(201).send(product.Sales[product.Sales.length - 1]);
    }
  },


};
export default Sale;
