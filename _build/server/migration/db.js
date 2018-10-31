'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropTables = exports.createTables = undefined;

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

/**
 * Create Tables
 */
var createTables = exports.createTables = function createTables() {
  pool.query('CREATE TABLE IF NOT EXISTS\n      products(\n        id serial PRIMARY KEY,\n        name character varying(50) NOT NULL,\n        price INT NOT NULL,\n        quantity INT NOT NULL\n      )');

  pool.query('CREATE TABLE IF NOT EXISTS\n      users(\n        user_id serial PRIMARY KEY,\n        name character varying(50) NOT NULL,\n        email character varying(100) NOT NULL,\n        role character varying(50) NOT NULL,\n        password character varying(100) NOT NULL\n      )');

  pool.query('CREATE TABLE IF NOT EXISTS\n          sales_record(\n            sales_record_id serial PRIMARY KEY,\n            product_name character varying(100) NOT NULL,\n            buyers_name character varying(100) NOT NULL,\n            price INT NOT NULL,\n            amount INT NOT NULL,\n            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n          )');
  pool.query('CREATE TABLE IF NOT EXISTS\n          categories(\n            category_id serial PRIMARY KEY,\n            category_name character varying(100) NOT NULL\n          )');
};

/**
 * Drop Tables
 */
var dropTables = exports.dropTables = function dropTables() {
  var queryTextProducts = 'DROP TABLE IF EXISTS products, sales_record, users, categories';
  pool.query(queryTextProducts).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
require('make-runnable');