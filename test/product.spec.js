import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /products', () => {
  let adminToken;
  it('should return a proper status code of 201 if product is created with proper response', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            name: 'Caprisone',
            price: 2200,
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}`)

          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.a('boolean');
            expect(res.body.success).to.equal(true);
            done();
          });
      });
  });
  it('should return a proper status code of 401 if user has in valid token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            name: 'Caprisone',
            price: 2200,
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}r`)

          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.a('boolean');
            expect(res.body.success).to.equal(false);
            done();
          });
      });
  });


  it('should return a proper status code of 409 if product already exist with proper response', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            name: 'Caprisone',
            price: 2200,
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}`)

          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.a('boolean');
            expect(res.body.success).to.equal(false);
            done();
          });
      });
  });

  describe('GET /products', () => {
    it('should return 200 with all products passed', (done) => {
      chai.request(server)
        .get('/api/v1/products')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('products');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.a('boolean');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
  describe('GET /products/:id', () => {
    it('Endpoint should return 404 if an invalid id is passed', (done) => {
      chai.request(server)
        .get(`/api/v1/products/${90}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('should be an object', (done) => {
      chai.request(server)
        .get(`/api/v1/products/${1}`)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
  });

  // needs authorization
  it('should return 400 if name is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            price: 2200,
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            done();
          });
      });
  });
  it('should return 400 if price is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            name: 'Sony Sps',
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            done();
          });
      });
  });
  it('should return 400 if quantity is not entered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .post('/api/v1/products')
          .send({
            name: 'Sony Sps',
            price: 2200,
          })
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            done();
          });
      });
  });
  //
  it('should return a status of 403 if user is not signed in', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
// needs authorization
describe('PUT /products', () => {
  let adminToken;
  it('should return status of 200 if product is modified', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .put(`/api/v1/products/${1}`)
          .send({
            name: 'Camera',
            price: 2200,
            quantity: 20,
          })
          .set('Authorization', `Bearer ${adminToken}`)

          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });

  it('should return status of 403 if user isnt authorized to modify product', (done) => {
    chai.request(server)
      .put(`/api/v1/products/${1}`)
      .send({
        name: 'Camera',
        price: 4400,
        quantity: 20,
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});

// needs authorization
describe('DELETE /products', () => {
  let adminToken;
  it('should return status of 200 if product is deleted', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        chai.request(server)
          .delete(`/api/v1/products/${1}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            done();
          });
      });
  });

  it('should return status of 403 if user isnt authorized to delete product', (done) => {
    chai.request(server)
      .delete(`/api/v1/products/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});
