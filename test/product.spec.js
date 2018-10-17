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