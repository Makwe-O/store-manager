import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /sales', () => {
  it('should return all sales records', (done) => {
    chai.request(server)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});


describe('POST /sales', () => {
  it('should return status 201 when sale is created', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        buyers_name: 'Mr Mike',
        price: 2200,
        amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should return status 400 when no value is passed', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('Shoud return status of 400 if Productname is missing ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        // product_name: 'Caprisone',
        price: 2200,
        buyers_name: 'Mr Mike',
        amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('Shoud return status of 400 if price is missing ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        // price: 2200,
        buyers_name: 'Mr Mike',
        amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('Shoud return status of 400 if buyers name is missing ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        price: 2200,
        // buyers_name: 'Mr Mike',
        amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('Shoud return status of 400 if amount is missing ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        price: 2200,
        buyers_name: 'Mr Mike',
        // amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('Shoud return status of 400 if price is not a number ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        price: '2200',
        buyers_name: 'Mr Mike',
        amount: 22,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it('Shoud return status of 400 if quantity is not a number ', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'Caprisone',
        price: 2200,
        buyers_name: 'Mr Mike',
        amount: '22',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});
describe('GET /sales/:id', () => {
  it('Endpoint should return 404 if an invalid id is passed', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${100}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done(err);
      });
  });
  it('should return a sale record if id is valid', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('sale_record');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.a('boolean');
        expect(res.body.success).to.equal(true);
        done(err);
      });
  });
});
