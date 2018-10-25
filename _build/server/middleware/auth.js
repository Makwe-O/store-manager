'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var authenticate = {
  ensureToken: function ensureToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(' ');
      var bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403).send({ message: 'You do not have Permission' });
    }
  }
};
exports.default = authenticate;