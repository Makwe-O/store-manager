'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  login: function login(req, res) {
    var admin = { id: 3 };
    var token = _jsonwebtoken2.default.sign({ admin: admin }, 'my_secret_key');
    res.json({
      token: token
    });
  },
  signup: function signup(req, res) {
    res.status(200).send({
      message: 'signup'
    });
  }
};
exports.default = User;