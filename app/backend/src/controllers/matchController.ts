import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (typeof inProgress === 'string') {
      const inProgressBoolean = inProgress.toLowerCase() === 'true';
      const allMatches = await this.matchService.getAllInProgress(inProgressBoolean);

      return res.status(200).json(allMatches);
    }

    const allMatches = await this.matchService.getAll();

    res.status(200).json(allMatches);
  };

  public create = async (req: Request, res: Response) => {
    const { body } = req;

    const newMatch = await this.matchService.create(body);

    res.status(201).json(newMatch);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchService.finish(Number(id));

    res.status(200).json({ message: 'Finished' });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const updateMatch = await this.matchService.update(Number(id), body);

    res.status(200).json(updateMatch);
  };
}

export default MatchController;
