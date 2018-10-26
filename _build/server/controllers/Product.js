'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Product = require('../models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
  getAllProduct: function getAllProduct(req, res) {
    var products = _Product2.default;
    return res.status(200).send(products);
  },
  getOneProduct: function getOneProduct(req, res) {
    var id = req.params.id;

    var found = false;
    var product = _Product2.default;
    product.Products.forEach(function (item) {
      if (item.id === id) {
        found = true;
        return res.status(200).json(item);
      }
    });
    if (!found) {
      res.status(404).json('Product not found');
    }
  },
  createProduct: function createProduct(req, res) {
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
    res.status(201).send(product);
  },
  modifyProduct: function modifyProduct(req, res) {
    res.status(200).send({
      message: 'Updated product'
    });
  },
  deleteProduct: function deleteProduct(req, res) {
    res.status(200).send({
      message: 'Product deleted'
    });
  }
};
exports.default = Product;