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


describe('POST /products', function () {
  var adminToken = void 0;
  it('should return a proper status code of 201 if product is created with proper response', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Caprisone',
        price: 2200,
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(true);
        done();
      });
    });
  });
  it('should return a proper status code of 401 if user has in valid token', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Caprisone',
        price: 2200,
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken + 'r').end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(false);
        done();
      });
    });
  });

  it('should return a proper status code of 409 if product already exist with proper response', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Caprisone',
        price: 2200,
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('GET /products', function () {
    it('should return 200 with all products passed', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/products').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('products');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(true);
        done();
      });
    });
  });
  describe('GET /products/:id', function () {
    it('Endpoint should return 404 if an invalid id is passed', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/products/' + 90).end(function (err, res) {
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

  // needs authorization
  it('should return 400 if name is not entered', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        price: 2200,
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  it('should return 400 if price is not entered', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Caprisone',
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  it('should return 400 if quantity is not entered', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).post('/api/v1/products').send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Caprisone',
        price: 2200,
        category_id: 1
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  //
  it('should return a status of 403 if user is not signed in', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/products').send({}).end(function (err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });
});
// needs authorization
describe('PUT /products', function () {
  var adminToken = void 0;
  it('should return status of 200 if product is modified', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).put('/api/v1/products/' + 1).send({
        product_image: 'https://i.imgur.com/wOCKR8X.jpg',
        product_name: 'Nikon d3000',
        price: 2200,
        category_id: 1,
        quantity: 20
      }).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  it('should return status of 403 if user isnt authorized to modify product', function (done) {
    _chai2.default.request(_index2.default).put('/api/v1/products/' + 1).send({
      product_image: 'https://i.imgur.com/wOCKR8X.jpg',
      product_name: 'Nikon d3000',
      price: 2200,
      category_id: 1,
      quantity: 20
    }).end(function (err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });
});

// needs authorization
describe('DELETE /products', function () {
  var adminToken = void 0;
  it('should return status of 200 if product is deleted', function (done) {
    _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
      email: 'jide1@yahoo.com',
      password: 'qwerty'
    }).end(function (err, res) {
      adminToken = res.body.token;
      _chai2.default.request(_index2.default).delete('/api/v1/products/' + 1).set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });

  it('should return status of 403 if user isnt authorized to delete product', function (done) {
    _chai2.default.request(_index2.default).delete('/api/v1/products/' + 1).end(function (err, res) {
      expect(res.status).to.equal(403);
      done();
    });
  });
});