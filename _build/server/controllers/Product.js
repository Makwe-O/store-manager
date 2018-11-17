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
    pool.query('SELECT product_id, product_image, product_name, price, category_name, quantity FROM products INNER JOIN categories USING (category_id) ORDER BY product_id ', function (err, res) {
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
    pool.query('SELECT product_id, product_image, product_name, price, category_name, quantity FROM products INNER JOIN categories USING (category_id) WHERE product_id = $1', [id], function (err, res) {
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
        image = _request$body.image,
        name = _request$body.name,
        price = _request$body.price,
        category = _request$body.category,
        quantity = _request$body.quantity;

    pool.query('SELECT * FROM products WHERE product_name= $1', [name], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        return response.status(409).json({
          success: false,
          message: 'Product already exists'
        });
      }
      pool.query('INSERT INTO products(product_image, product_name, price, category_id, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *', [image, name, price, category, quantity], function (err, res) {
        if (err) return next(err);
        response.status(201).json({
          success: true,
          message: 'Product Created!',
          products: res.rows[0]
        });
      });
    });
  },
  modifyProduct: function modifyProduct(request, response, next) {
    var id = request.params.id;
    var _request$body2 = request.body,
        image = _request$body2.image,
        name = _request$body2.name,
        price = _request$body2.price,
        category = _request$body2.category,
        quantity = _request$body2.quantity;


    var keys = ['product_image', 'product_name', 'price', 'category_id', 'quantity'];

    var feilds = [];

    keys.forEach(function (key) {
      if (request.body[key]) feilds.push(key);
    });

    feilds.forEach(function (feild, index) {
      pool.query('Update products SET ' + feild + '=($1) WHERE product_id=($2)', [request.body[feild], id], function (err, res) {
        if (err) return next(err);

        if (index === feilds.length - 1) response.status(200).send({ message: 'Product Updated successfully' });
      });
    });
  },
  deleteProduct: function deleteProduct(request, response, next) {
    var id = request.params.id;

    pool.query('DELETE FROM products WHERE product_id=($1)', [id], function (err, res) {
      if (err) return next(err);
      response.status(200).send({ message: 'Product Deleted Successfully' });
    });
  }
};
exports.default = Product;