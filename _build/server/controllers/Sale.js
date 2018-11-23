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
    pool.query('SELECT sales_record_id, name, product_name, price, sales_amount, date FROM sales_record INNER JOIN users USING (user_id) INNER JOIN products USING (product_id) ORDER BY sales_record_id ', function (err, res) {
      if (err) return next(err);
      response.status(200).send({
        success: true,
        sales_record: res.rows
      });
    });
  },
  getOneSalesRecord: function getOneSalesRecord(request, response, next) {
    var id = request.params.id;

    var found = false;
    pool.query('SELECT * FROM sales_record WHERE sales_record_id = $1', [id], function (err, res) {
      if (err) return next(err);
      if (res.rowCount !== 0) {
        found = true;
        return response.status(200).json({
          success: true,
          sale_record: res.rows[0]
        });
      }
      if (!found) {
        return response.status(404).send({
          success: false,
          message: 'No such record'
        });
      }
    });
  },
  createSalesRecord: function createSalesRecord(request, response, next) {
    var _request$body = request.body,
        user_id = _request$body.user_id,
        product_id = _request$body.product_id,
        sales_amount = _request$body.sales_amount;

    pool.query('INSERT INTO sales_record(user_id, product_id, sales_amount) VALUES($1, $2, $3)', [user_id, product_id, sales_amount], function (err, res) {
      if (err) return next(err);
      response.status(201).send({
        success: true,
        message: 'Sales Record Created!',
        sale_record: res.rows[0]
      });
    });
  }
};
exports.default = Sale;