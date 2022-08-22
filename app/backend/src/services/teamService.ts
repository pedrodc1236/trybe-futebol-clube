import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';
import throwCustomError from '../utils/throwCustomError';

class TeamService {
  public getAll = async (): Promise<ITeam[]> => {
    const allTeams = await Team.findAll();
    return allTeams;
  };

  public getById = async (id: number): Promise<ITeam> => {
    const team = await Team.findByPk(id);

    if (team === null) throwCustomError('notFoundError', 'Team does not exist');
    return team as ITeam;
  };
}

export default TeamService;
