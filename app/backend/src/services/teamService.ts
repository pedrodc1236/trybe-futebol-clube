import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

class TeamService {
  public getAll = async (): Promise<ITeam[]> => {
    const allTeams = Team.findAll();
    return allTeams;
  };
}

export default TeamService;
