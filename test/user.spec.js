import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /auth/signup', () => {
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
  describe('GET /auth/login', () => {
    it('Should return object if input is valid', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'jide1@yahoo.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('Should return status 200 if login details are correct', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'jide1@yahoo.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should return status 401 if login details are incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'jide@yahoo.com',
          password: 'qerty',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should return status 401 if no data is sent', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  it('Should return status 409 if email exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Jide',
        email: 'jide1@yahoo.com',
        role: 'Admin',
        password: 'qwerty',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
});
describe('GET /auth/signup', () => {
  it('Should return status 201 if attendant is created', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Jide',
        email: 'jide10@yahoo.com',
        role: 'Attendant',
        password: 'qwerty',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('Should return status 409 if email exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        name: 'Jide',
        email: 'jide10@yahoo.com',
        role: 'Attendant',
        password: 'qwerty',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
  it('Should return status 200 if login details are correct', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'jide10@yahoo.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
