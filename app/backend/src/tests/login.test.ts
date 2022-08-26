import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { bodyLogin, IUser } from '../interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'Pedro',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const reqBody: bodyLogin = {
  email: 'user@user.com',
  password: 'secret_user',
}

describe('Test the login route', () => {
  describe('POST /login error', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(null)
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return error 400 if the password is less than 6 characters', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secre',
        });        

      expect(response.status).to.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'Password is less than 6 characters' })
    })

    it ('should return error 400 if the email has an invalid format', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'useruser.com',
          password: 'secret_user',
        });        

      expect(response.status).to.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email' })
    })
    
    it ('should return error 400 if email or password is not passed', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: '',
          password: 'secret_user',
        });        

      expect(response.status).to.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })
    })

    it ('should returns error 401 if the email or password is incorrect', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'user2@user.com',
          password: 'secret_user2',
        })
      
      expect(response.status).to.equal(401);
    })
  })

  describe('POST /login', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as User)
    })

    afterEach(() => {
      sinon.restore();
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(reqBody);

      expect(response.status).to.equal(200);
    })

    it ('should return jwt token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(reqBody);
      
      expect(response.body).to.have.key('token')
    })
  })

  describe('GET /login/validate', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as User)
    })

    afterEach(() => {
      sinon.restore();
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(reqBody);

      const response2 = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', response.body.token);

      expect(response2.status).to.equal(200);
    })

    it ('should return the role', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(reqBody);

      const response2 = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', response.body.token);

      expect(response2.body).to.have.key('role');
    })
  })
})