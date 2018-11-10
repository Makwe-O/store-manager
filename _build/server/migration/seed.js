'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertTables = undefined;

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('connected to the db');
});

var insertTables = exports.insertTables = function insertTables() {
  pool.query('INSERT INTO products(name, price, quantity) VALUES (\'DELL inspiron\', \'2000\', \'1\')');
  pool.query('INSERT INTO products(name, price, quantity) VALUES (\'Sony SPS\', \'3000\', \'2\')');
  pool.query('INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES (\'DELL inspiron\', \'Peter\', \'2000\', \'3\')');
  pool.query('INSERT INTO sales_record(product_name, buyers_name, price, amount) VALUES (\'Sony SPS\', \'David\', \'30000\', \'4\')');
  pool.query('INSERT INTO users(name, email, role, password) VALUES (\'Ope\', \'ope@yahoo.com\', \'Attendant\', \'qwerty123\')');
  pool.query('INSERT INTO users(name, email, role, password) VALUES (\'Mmakwe\', \'jide@yahoo.com\', \'Admin\', \'qwerty\')');
  pool.query('INSERT INTO categories(category_name) VALUES (\'clothes\')');
};
require('make-runnable');