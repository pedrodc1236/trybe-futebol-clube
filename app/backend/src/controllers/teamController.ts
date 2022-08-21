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

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamService.getById(Number(id));

    res.status(200).json(team);
  };
}

export default TeamController;
