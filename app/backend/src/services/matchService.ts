import { IMatch } from '../interfaces/index';
import TeamModel from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

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
}

export default MatchService;
