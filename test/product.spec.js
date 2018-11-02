import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /products', () => {
  it('should return 200 with all products passed', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
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
describe('POST /products', () => {
  let adminToken;
  it('should return a status code of 201 if product is created', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide1@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        adminToken = res.body.token;
        console.log('*********', adminToken);
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
            done();
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
        console.log('*********', adminToken);
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
