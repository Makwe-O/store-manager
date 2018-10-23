'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Product = require('../controllers/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureToken(req, res, next) {
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

var router = _express2.default.Router();
router.get('/', _Product2.default.getAll);
router.get('/:id', _Product2.default.getOne);
router.post('/', ensureToken, _Product2.default.create);

exports.default = router;