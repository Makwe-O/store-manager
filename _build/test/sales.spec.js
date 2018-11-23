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


describe('POST /sales', function () {
  before(function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      name: 'ayo',
      email: 'jide12@yahoo.com',
      role: 'Admin',
      password: 'qwerty'
    }).end(function () {
      done();
    });
  });
  it('should return status 201 when sale is created', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: 2,
      product_id: 2,
      sales_amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      done();
    });
  });
});

describe('GET /sales', function () {
  it('should return all sales records', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales').end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });

  it('should return status 400 when no value is passed', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({}).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });

  it('Shoud return status of 400 if User_id is missing ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      product_id: 2,
      sales_amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
  it('Shoud return status of 400 if User_id is not a number ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: '2',
      product_id: 2,
      sales_amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
  it('Shoud return status of 400 if Product_id is missing ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: 2,
      sales_amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
  it('Shoud return status of 400 if Product_id is not a number ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: 2,
      product_id: '2',
      sales_amount: 22
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
  it('Shoud return status of 400 if Sale Amount is missing ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: 2,
      product_id: 2

    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
  it('Shoud return status of 400 if Sale Amount is not a number ', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/sales').send({
      user_id: 2,
      product_id: 2,
      sales_amount: '22'
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(false);
      done();
    });
  });
});

describe('GET /sales/:id', function () {
  it('Endpoint should return 404 if an invalid id is passed', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 100).end(function (err, res) {
      expect(res.status).to.equal(404);
      done(err);
    });
  });
  it('should return a sale record if id is valid', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 1).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('sale_record');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.a('boolean');
      expect(res.body.success).to.equal(true);
      done(err);
    });
  });
});