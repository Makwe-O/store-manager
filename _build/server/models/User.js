'use strict';

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
var createTables = function createTables() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      products(\n        user_id serial PRIMARY KEY,\n        name character varying(50) NOT NULL,\n        email character varying(100) NOT NULL,\n        password character varying(50) NOT NULL\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

/**
 * Drop Tables
 */
var dropTables = function dropTables() {
  var queryText = 'DROP TABLE IF EXISTS products';
  pool.query(queryText).then(function (res) {
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

module.exports = {
  createTables: createTables,
  dropTables: dropTables
};

require('make-runnable');