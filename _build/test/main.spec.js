'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


describe('GET /', function () {
  it('should return status code of 200', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.exist;
      done();
    });
  });
  it('should return an object', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/').end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
});