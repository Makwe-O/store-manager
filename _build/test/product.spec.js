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


describe('Test for availability of Products', function () {
  it('should return 200', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/products').end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
});
describe('GET /products/:id', function () {
  it('Endpoint should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/products/' + 9).end(function (err, res) {
      expect(res.status).to.equal(404);
      done(err);
    });
  });
  it('should be an object', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/products/' + 1).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
});
describe('POST /products', function () {
  it('should return an object if valid input is passed', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/products').send({
      id: 3,
      name: 'Caprisone',
      price: 2200,
      quantity: 20
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
});