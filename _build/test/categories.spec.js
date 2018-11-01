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

var adminToken = void 0;
describe('category', function () {
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
  describe('GET /category', function () {
    it('should return 200 with all categories passed', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/categories').end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('POST /category', function () {
    before(function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'jide1@yahoo.com',
        password: 'qwerty'
      }).end(function (err, res) {
        adminToken = res.body.token;
        done();
      });
    });
    it('should return status of 201 when category is created', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/categories').send({
        category_name: 'foods'
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        console.log("@@@@@@@@@@", adminToken);
        expect(res.status).to.equal(201);
        done();
      });
    });
    it('should return a status code of 400 when category_name is blank', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/categories').send({
        // category_name: 'Caprisone',
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {

        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET /category/:id', function () {
    it('Endpoint should return 404 if an invalid id is passed', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/categories/' + 90).end(function (err, res) {
        expect(res.status).to.equal(404);
        done(err);
      });
    });
    it('Endpoint should return 200 if a valid id is passed', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/categories/' + 1).end(function (err, res) {
        expect(res.status).to.equal(200);
        done(err);
      });
    });
  });
  describe('PUT /Category', function () {
    it('should return status of 200 if category is modified', function (done) {
      _chai2.default.request(_index2.default).put('/api/v1/categories/' + 1).send({
        category_name: 'Fishing'
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should return status of 403 if user isnt authorized to modify product', function (done) {
      _chai2.default.request(_index2.default).put('/api/v1/categories/' + 2).send({
        categoryName: 'Fishing'
      }).end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
  });
});