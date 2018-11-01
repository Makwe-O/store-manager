'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

var User = {
  login: function login(request, response, next) {
    var _request$body = request.body,
        email = _request$body.email,
        password = _request$body.password;

    pool.query('SELECT * FROM users WHERE email= $1', [email], function (err, res) {
      if (err) return next(err);
      if (res.rowCount < 1) {
        return response.status(401).send({ message: 'Could not login. Wrong Email or Password' });
      }
      _bcrypt2.default.compare(request.body.password, res.rows[0].password, function (err, result) {
        if (err) {
          return response.status(401).send({
            message: 'Could not login. Wrong Email or Password'
          });
        }
        if (result) {
          var userDetail = res.rows[0];
          var token = _jsonwebtoken2.default.sign(userDetail, 'secretkey', {
            expiresIn: '1hr'
          });
          return response.status(200).send({
            message: 'login. Auth Successful',
            token: token
          });
        }
        response.status(401).send({
          message: 'Could not login. Wrong Email or password'
        });
      });
    });
  },
  signup: function signup(request, response, next) {
    var _request$body2 = request.body,
        name = _request$body2.name,
        email = _request$body2.email,
        role = _request$body2.role,
        password = _request$body2.password;

    // Hash password

    _bcrypt2.default.hash(password, 10, function (err, hash) {
      if (err) {
        return response.status(501).json({ error: err });
      }

      // Check if mail exists
      pool.query('SELECT * FROM users WHERE email= $1', [email], function (err, res) {
        if (err) return next(err);
        if (res.rowCount !== 0) {
          return response.status(409).json({ message: 'Mail Exists' });
        }

        // Insert new user
        pool.query('INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4)', [name, email, role, hash], function (err, res) {
          if (err) {
            console.log(next(err));
            return next(err);
          }
          response.status(201).send({ message: 'User Created!' });
        });
      });
    });
  }
};
exports.default = User;