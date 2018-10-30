'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Product = require('../controllers/Product');

var _Product2 = _interopRequireDefault(_Product);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/', _Product2.default.getAllProduct);
router.get('/:id', _Product2.default.getOneProduct);
router.post('/', _auth2.default.ensureToken, _validate2.default.emptyValueProduct, _Product2.default.createProduct);
router.put('/:id', _Product2.default.modifyProduct);
router.delete('/:id', _Product2.default.deleteProduct);

exports.default = router;