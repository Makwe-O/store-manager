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

var Sale = {
  getAllSalesRecord: function getAllSalesRecord(request, response, next) {
    pool.query('SELECT * FROM sales_record ORDER BY sales_record_id ', function (err, res) {
      if (err) return next(err);
      response.status(200).send(res.rows);
    });
  },
  getOneSalesRecord: function getOneSalesRecord(request, response, next) {
    var id = request.params.id;

    var found = false;
    pool.query('SELECT * FROM sales_record WHERE sales_record_id = $1', [id], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        found = true;
        return response.status(200).json(res.rows[0]);
      }
      if (!found) return response.status(404).send({ message: 'No such record' });
    });
  },
  createSalesRecord: function createSalesRecord(request, response, next) {
    var _request$body = request.body,
        product_name = _request$body.product_name,
        buyers_name = _request$body.buyers_name,
        price = _request$body.price,
        amount = _request$body.amount;

    pool.query('INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES($1, $2, $3, $4)', [product_name, buyers_name, price, amount], function (err, res) {
      if (err) return next(err);
      response.status(201).send({
        message: 'Sales Record Created!',
        sale: res.rows
      });
    });
  }
};
exports.default = Sale;