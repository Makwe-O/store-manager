import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /', () => {
  it('should return status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        done();
      });
  });
  it('should return an object', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
