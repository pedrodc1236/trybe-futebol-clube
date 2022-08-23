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
}

export default MatchController;
