import { IMatch, MatchTeamsAndGoals } from '../interfaces/index';
import TeamModel from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import throwCustomError from '../utils/throwCustomError';

class MatchService {
  public getAll = async (): Promise<IMatch[]> => {
    const allMatches = await Match.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
    }) as IMatch[];

    return allMatches;
  };

  public getAllInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const allMatchs = await Match.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
      where: { inProgress },
    }) as IMatch[];

    return allMatchs;
  };

  private validateTeam = async (teamId: number) => {
    const teamExists = await TeamModel.findOne({ where: { id: teamId } });

    return teamExists;
  };

  private validateReqBody = (team1: number, team2: number) => {
    if (team1 === team2) {
      throwCustomError(
        'unauthorizedError',
        'It is not possible to create a match with two equal teams',
      );
    }
  };

  public create = async (reqBody: MatchTeamsAndGoals): Promise<IMatch | undefined> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = reqBody;

    const validateHomeTeam = await this.validateTeam(homeTeam);
    const validateAwayTeam = await this.validateTeam(awayTeam);

    if (!validateHomeTeam || !validateAwayTeam) {
      throwCustomError('notFoundError', 'There is no team with such id!');
    }

    this.validateReqBody(homeTeam, awayTeam);

    const newMatch = await Match
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });

    return {
      id: newMatch.id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    };
  };

  public finish = async (id: number): Promise<boolean> => {
    const finishMatch = await Match.findOne({ where: { id } });

    if (finishMatch === null) {
      throwCustomError('notFoundError', 'There is no team with such id!');
    }
    if (finishMatch?.inProgress === false) {
      throwCustomError('notFoundError', 'This game is over!');
    }

    await Match.update({ inProgress: false }, { where: { id } });

    return true;
  };
}

export default MatchService;
