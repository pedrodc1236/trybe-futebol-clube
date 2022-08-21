import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAll = async (req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    res.status(200).json(allTeams);
  };
}

export default TeamController;
