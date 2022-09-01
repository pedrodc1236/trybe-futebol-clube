import { Request, Response } from 'express';
import MatchService from '../services/matchService';
import TeamService from '../services/teamService';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  leaderboardService: LeaderboardService;
  teamService: TeamService;
  matchService: MatchService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
    this.teamService = new TeamService();
    this.matchService = new MatchService();
  }

  leaderboardHome = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    const allMatches = await this.matchService.getAllInProgress(false);

    const leaderboardHome = await Promise.all(allTeams.map((team) =>
      this.leaderboardService.leaderboardHome(team, allMatches)));

    const sortLeaderboad = await this.leaderboardService.sortLeaderboad(leaderboardHome);

    res.status(200).json(sortLeaderboad);
  };

  leaderboardAway = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    const allMatches = await this.matchService.getAllInProgress(false);

    const leaderboardHome = await Promise.all(allTeams.map((team) =>
      this.leaderboardService.leaderboardAway(team, allMatches)));

    const sortLeaderboad = await this.leaderboardService.sortLeaderboad(leaderboardHome);

    res.status(200).json(sortLeaderboad);
  };

  leaderboard = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    const allMatches = await this.matchService.getAllInProgress(false);

    const leaderboardHome = await Promise.all(allTeams.map((team) =>
      this.leaderboardService.leaderboard(team, allMatches)));

    const sortLeaderboad = await this.leaderboardService.sortLeaderboad(leaderboardHome);

    res.status(200).json(sortLeaderboad);
  };
}

export default LeaderboardController;
