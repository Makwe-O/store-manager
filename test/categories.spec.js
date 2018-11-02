import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;
let adminToken;
describe('category', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Jide',
        email: 'jide1@yahoo.com',
        role: 'Admin',
        password: 'qwerty',
      })
      .end(() => {
        done();
      });
  });
  describe('GET /category', () => {
    it('should return 200 with all categories passed', (done) => {
      chai.request(server)
        .get('/api/v1/categories')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('POST /category', () => {
    before((done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'jide1@yahoo.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          adminToken = res.body.token;
          done();
        });
    });
    it('should return status of 201 when category is created', (done) => {
      chai.request(server)
        .post('/api/v1/categories')
        .send({
          category_name: 'foods',
        })
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          console.log("@@@@@@@@@@", adminToken);
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return a status code of 400 when category_name is blank', (done) => {
      chai.request(server)
        .post('/api/v1/categories')
        .send({
          // category_name: 'Caprisone',
        })
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET /category/:id', () => {
    it('Endpoint should return 404 if an invalid id is passed', (done) => {
      chai.request(server)
        .get(`/api/v1/categories/${90}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('Endpoint should return 200 if a valid id is passed', (done) => {
      chai.request(server)
        .get(`/api/v1/categories/${1}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
  describe('PUT /Category', () => {
    it('should return status of 200 if category is modified', (done) => {
      chai.request(server)
        .put(`/api/v1/categories/${1}`)
        .send({
          category_name: 'Fishing',
        })
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return status of 403 if user isnt authorized to modify product', (done) => {
      chai.request(server)
        .put(`/api/v1/categories/${2}`)
        .send({
          categoryName: 'Fishing',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
});
