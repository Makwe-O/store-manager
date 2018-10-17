import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test for Products', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
describe('GET /products/:id', () => {
  it('Endpoint should return 404 if an invalid id is passed', (done) => {
    chai.request(server)
      .get(`/api/v1/products/${9}`)
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
  it('should return an object if valid input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .send({
        id: 3,
        name: 'Caprisone',
        price: 2200,
        quantity: 20,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
