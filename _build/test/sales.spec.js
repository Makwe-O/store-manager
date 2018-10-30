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


describe('GET /sales', function () {
  it('should return all sales records', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales').end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});

describe('GET /sales/:id', function () {
  it('Endpoint should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 70).end(function (err, res) {
      expect(res.status).to.equal(404);
      done(err);
    });
  });
  it('should be an object', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 1).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
  it('should return a sale record if id is valid', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 1).end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
describe('POST /sales', function () {
  it('should return an object if valid input is passed', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/product/sales').send({
      product_name: "Sony Sps",
      buyers_name: "Mr. Mike",
      price: 30,
      amount: 22
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      done();
    });
  });
  it('should return status 201 when sale is created', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      product_name: 'Caprisone',
      buyers_name: 'Mr Mike',
      price: 2200,
      amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('should return status 400 when no value is passed', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({}).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('Price and Amount should equal number ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      product_name: 'Caprisone',
      price: 2200,
      buyers_name: 'Mr Mike',
      amount: 22
    }).end(function (err, res) {
      expect(res.body.price).to.be.a('number');
      expect(res.body.amount).to.be.a('number');
      done();
    });
  });
});