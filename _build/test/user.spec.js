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


describe('GET /auth/signup', function () {
  before(function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      name: 'Jide',
      email: 'jide1@yahoo.com',
      role: 'Admin',
      password: 'qwerty'
    }).end(function () {
      done();
    });
  });
  describe('GET /auth/login', function () {
    it('Should return object if input is valid', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'jide1@yahoo.com',
        password: 'qwerty'
      }).end(function (err, res) {
        expect(res.body).to.be.an('object');
        done();
      });
    });
    it('Should return status 200 if login details are correct', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'jide1@yahoo.com',
        password: 'qwerty'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('Should return status 401 if login details are incorrect', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'jide@yahoo.com',
        password: 'qerty'
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
    it('Should return status 401 if no data is sent', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({}).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });

  it('Should return status 409 if email exist', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      name: 'Jide',
      email: 'jide1@yahoo.com',
      role: 'Admin',
      password: 'qwerty'
    }).end(function (err, res) {
      expect(res.status).to.equal(409);
      done();
    });
  });
});
describe('GET /auth/signup', function () {
  it('Should return status 201 if attendant is created', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      name: 'Jide',
      email: 'jide10@yahoo.com',
      role: 'Attendant',
      password: 'qwerty'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      done();
    });
  });
  it('Should return status 409 if email exist', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send({
      name: 'Jide',
      email: 'jide10@yahoo.com',
      role: 'Attendant',
      password: 'qwerty'
    }).end(function (err, res) {
      expect(res.status).to.equal(409);
      done();
    });
  });
  it('Should return status 200 if login details are correct', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide10@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
});