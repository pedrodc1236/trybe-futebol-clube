import { ITeam } from './../interfaces/index';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock: ITeam = {
  id: 1,
  teamName: 'Avaí/Kindermann',
}

describe('Test the Team route', () => {
  describe('GET /teams', () => {
    beforeEach(() => {
      sinon.stub(Team, "findAll").resolves([ teamsMock as Team ])
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams');
      
      expect(response.status).to.equal(200);
    })

    it ('should return list of teams', async () => {
      const response = await chai.request(app)
        .get('/teams');
          
      expect(response.body).to.be.deep.equal([ teamsMock ]);
    })
  })

   describe('GET /teams/:id', () => {
    beforeEach(() => {
      sinon.stub(Team, "findByPk").resolves(teamsMock as Team)
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams/1');

      expect(response.status).to.equal(200);
    })

    it ('should return info team', async () => {
      const response = await chai.request(app)
        .get('/teams/1');

      expect(response.body).to.be.deep.equal(teamsMock);
    })
  })
})