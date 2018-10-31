'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Category = require('../controllers/Category');

var _Category2 = _interopRequireDefault(_Category);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/', _Category2.default.getAllCategory);
router.get('/:id', _Category2.default.getOneCategory);
router.post('/', _auth2.default.ensureToken, _validate2.default.emptyValueCategory, _Category2.default.createCategory);
router.put('/:id', _auth2.default.ensureToken, _Category2.default.modifyCategory);
router.delete('/:id', _auth2.default.ensureToken, _Category2.default.deleteCategory);

exports.default = router;