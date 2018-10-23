'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Product = require('../models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
  getAll: function getAll(req, res) {
    var products = _Product2.default;
    return res.send(products);
  },
  getOne: function getOne(req, res) {
    var id = req.params.id;

    var found = false;
    var product = _Product2.default;
    product.Products.forEach(function (item) {
      if (item.id === id) {
        found = true;
        return res.json(item);
      }
    });
    if (!found) {
      res.status(404).json('Product not found');
    }
  },
  create: function create(req, res) {
    var _req$body = req.body,
        id = _req$body.id,
        name = _req$body.name,
        price = _req$body.price,
        quantity = _req$body.quantity;

    var product = _Product2.default;
    product.Products.push({
      id: id,
      name: name,
      price: price,
      quantity: quantity
    });
    res.json(product).send(201);
  }
};
exports.default = Product;