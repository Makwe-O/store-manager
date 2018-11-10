'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticate = {
  ensureToken: function ensureToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(' ');
      var bearerToken = bearer[1];
      _jsonwebtoken2.default.verify(bearerToken, 'secretkey', function (err, decoded) {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Please Sign in with the right token' });
        }
        req.token = decoded;
        next();
      });
    } else {
      res.status(403).send({ message: 'You do not have Permission' });
    }
  }
};
exports.default = authenticate;