import { IMatch, bodyLogin } from './../interfaces/index';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock: IMatch[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Corinthians'
    },
    teamAway: {
      teamName: 'Napoli-SC'
    }
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
];

const matchesMockInProgresTrue: IMatch[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Corinthians'
    },
    teamAway: {
      teamName: 'Napoli-SC'
    }
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
];

const matchesMockInProgresFalse: IMatch[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Corinthians'
    },
    teamAway: {
      teamName: 'Napoli-SC'
    }
  },
  {
    id: 4,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
];

const createMock: IMatch = {
  id: 2,
  homeTeam: 3,
  homeTeamGoals: 0,
  awayTeam: 2,
  awayTeamGoals: 0,
  inProgress: true,
};

const reqBody: bodyLogin = {
  email: 'user@user.com',
  password: 'secret_user',
}

describe('Test in Matches route', () => {
  describe('GET /matches', () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(matchesMock as Match[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.status).to.equal(200);
    })

    it ('should return list of matches', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.body).to.be.deep.equal(matchesMock);
    })
  })

  describe('GET /matches inProgress true', () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(matchesMockInProgresTrue as Match[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches?inProgress=true');

      expect(response.status).to.equal(200);
    })

    it ('should return list of matches inProgress true', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.body).to.be.deep.equal(matchesMockInProgresTrue);
    })
  })

  describe('GET /matches inProgress false', () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(matchesMockInProgresFalse as Match[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches?inProgress=false');

      expect(response.status).to.equal(200);
    })

    it ('should return list of matches inProgress false', async () => {
      const response = await chai.request(app)
        .get('/matches');

      expect(response.body).to.be.deep.equal(matchesMockInProgresFalse);
    })
  })

  describe('POST /matches', () => {
    beforeEach(() => {
      sinon.stub(Match, "create").resolves(createMock as Match)
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 201', async () => {
      const login = await chai.request(app)
      .post('/login')
      .send(reqBody);

      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', login.body.token)
        .send({
          "homeTeam": 3, 
          "awayTeam": 2, 
          "homeTeamGoals": 0,
          "awayTeamGoals": 0
        })
      
      expect(response.status).to.equal(201)
    })

    it ('should returns the body with the information of the match created', async () => {
      const login = await chai.request(app)
      .post('/login')
      .send(reqBody);

      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', login.body.token)
        .send({
          "homeTeam": 3, 
          "awayTeam": 2, 
          "homeTeamGoals": 0,
          "awayTeamGoals": 0
        })
      
      expect(response.body).to.be.deep.equal(createMock)
    })
  })

  describe('PATCH /matches/:id/finish', () => {
    beforeEach(() => {
      sinon.stub(Match, "findOne").resolves(createMock as Match)
    })

    afterEach(() => {
      sinon.restore()
    })

    it ('should return status 200', async () => {
      const response = await chai.request(app)
        .patch('/matches/:id/finish');

      expect(response.status).to.equal(200);
    })

    it ('should return message finish', async () => {
      const response = await chai.request(app)
        .patch('/matches/:id/finish');

      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    })
  })
})