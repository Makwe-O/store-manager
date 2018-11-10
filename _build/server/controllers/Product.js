'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
var Product = {
  getAllProduct: function getAllProduct(request, response, next) {
    pool.query('SELECT * FROM products ORDER BY id ', function (err, res) {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        products: res.rows
      });
    });
  },
  getOneProduct: function getOneProduct(request, response, next) {
    var id = request.params.id;

    var found = false;
    pool.query('SELECT * FROM products WHERE id = $1', [id], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        found = true;
        return response.status(200).json({
          success: 'true',
          product: res.rows[0]
        });
      }
      if (!found) {
        return response.status(404).send({
          success: 'False',
          message: 'No such record'
        });
      }
    });
  },
  createProduct: function createProduct(request, response, next) {
    var _request$body = request.body,
        name = _request$body.name,
        price = _request$body.price,
        quantity = _request$body.quantity;

    pool.query('SELECT * FROM products WHERE name= $1', [name], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        return response.status(409).json({
          success: false,
          message: 'Product already exists'
        });
      }
      pool.query('INSERT INTO products(name, price, quantity) VALUES($1, $2, $3)', [name, price, quantity], function (err, res) {
        if (err) return next(err);
        response.status(201).json({
          success: true,
          message: 'Product Created!',
          products: res.rows
        });
      });
    });
  },
  modifyProduct: function modifyProduct(request, response, next) {
    var id = request.params.id;
    var _request$body2 = request.body,
        name = _request$body2.name,
        price = _request$body2.price,
        quantity = _request$body2.quantity;


    var keys = ['name', 'price', 'quantity'];

    var feilds = [];

    keys.forEach(function (key) {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach(function (feild, index) {
      pool.query('Update products SET ' + feild + '=($1) WHERE id=($2)', [request.body[feild], id], function (err, res) {
        if (err) return next(err);

        if (index === feilds.length - 1) response.status(200).send({ message: 'Product Updated successfully' });
      });
    });
  },
  deleteProduct: function deleteProduct(request, response, next) {
    var id = request.params.id;

    pool.query('DELETE FROM products WHERE id=($1)', [id], function (err, res) {
      if (err) return next(err);
      response.status(200).send({ message: 'Product Deleted Successfully' });
    });
  }
};
exports.default = Product;