'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sale = require('../models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sale = {
  getAll: function getAll(req, res) {
    var sales = _Sale2.default;
    return res.send(sales);
  },
  getOne: function getOne(req, res) {
    var id = req.params.id;

    var found = false;
    var product = _Sale2.default;
    product.Sales.forEach(function (item) {
      if (item.id === id) {
        found = true;
        return res.json(item);
      }
    });
    if (!found) {
      res.status(404).json('Sales record not found');
    }
  },
  create: function create(req, res) {
    var _req$body = req.body,
        id = _req$body.id,
        productName = _req$body.productName,
        price = _req$body.price,
        buyersName = _req$body.buyersName,
        amount = _req$body.amount;

    var product = _Sale2.default;
    if (!productName || !price || !buyersName || !amount) {
      console.log(productName, price, buyersName, amount);
      res.status(400).send({ message: 'Error, One or more feilds are blank' });
    } else {
      product.Sales.push({
        id: id,
        productName: productName,
        price: price,
        buyersName: buyersName,
        amount: amount
      });
      res.json(product.Sales[product.Sales.length - 1]);
    }
  }
};
exports.default = Sale;