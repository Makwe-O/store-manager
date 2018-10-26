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

var _userRoutes = require('./server/routes/user-routes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
// Routes to handle requests
app.use('/api/v1/products', _productRoutes2.default);
app.use('/api/v1/sales', _saleRoutes2.default);
app.use('/api/v1/auth', _userRoutes2.default);

app.get('/api/v1', function (req, res) {
  res.send({ message: 'Welcome to store manager' });
});

// Handle unknown routes
app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
exports.default = server;