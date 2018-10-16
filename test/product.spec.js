import chai from 'chai';
import chaiHttp from 'chai-http';
import product from '../server/routes/product-routes';
import server from '../index';

chai.use(chaiHttp);
const should = chai.should();

describe('Test for Products', () => {
  it('should return 200', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});