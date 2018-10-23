'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _productRoutes = require('./server/routes/product-routes');

var _productRoutes2 = _interopRequireDefault(_productRoutes);

var _saleRoutes = require('./server/routes/sale-routes');

var _saleRoutes2 = _interopRequireDefault(_saleRoutes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use('/api/v1/products', _productRoutes2.default);
app.use('/api/v1/sales', _saleRoutes2.default);

app.get('/api/v1', function (req, res) {
  res.send({ message: 'Welcome to store manager' });
});
app.post('/api/v1/login', function (req, res) {
  var admin = { id: 3 };
  var token = _jsonwebtoken2.default.sign({ admin: admin }, 'my_secret_key');
  res.json({
    token: token
  });
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
exports.default = server;