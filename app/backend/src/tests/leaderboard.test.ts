import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the Leaderboard route', () => {
  describe('should return status 200', () => {
    it ('GET /leaderboard/home', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home');

      expect(response.status).to.equal(200);
    })
  })
})