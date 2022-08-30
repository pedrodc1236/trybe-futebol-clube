import { ILeaderboard, IMatch, ITeam } from '../interfaces';

type balanceMatch = {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
};

class LeaderboardService {
  private teamAllMatches = (team: ITeam, matches: IMatch[]) => {
    const filteredMatches = matches.filter((match) => match.homeTeam === team.id);

    return filteredMatches;
  };

  private matchBalance = (allMatchesTeam: IMatch[]) => {
    const balance = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    allMatchesTeam.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        balance.totalVictories += 1;
      }

      if (match.homeTeamGoals < match.awayTeamGoals) {
        balance.totalLosses += 1;
      }

      if (match.homeTeamGoals === match.awayTeamGoals) {
        balance.totalDraws += 1;
      }
    });

    return balance;
  };

  private countPoints = (balanceTeam: balanceMatch) => {
    const { totalVictories, totalDraws } = balanceTeam;

    return (totalVictories * 3) + totalDraws;
  };

  private goalsForAndAgainst = (allMatchesTeam: IMatch[]) => {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    allMatchesTeam.forEach((match) => {
      goals.goalsFavor += match.homeTeamGoals;
      goals.goalsOwn += match.awayTeamGoals;
    });

    return goals;
  };

  public leaderboardHome = async (team: ITeam, matches: IMatch[]): Promise<ILeaderboard> => {
    const allMatchesTeam = this.teamAllMatches(team, matches);

    const balanceTeam = this.matchBalance(allMatchesTeam);

    const { totalVictories, totalDraws, totalLosses } = balanceTeam;

    const points = this.countPoints(balanceTeam);

    const goals = this.goalsForAndAgainst(allMatchesTeam);

    const { goalsFavor, goalsOwn } = goals;

    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: allMatchesTeam.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((points / (allMatchesTeam.length * 3)) * 100).toFixed(2)),
    };
  };

  public sortLeaderboad = async (leaderboard: ILeaderboard[]): Promise<ILeaderboard[]> => {
    const sortLeaderboad = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return sortLeaderboad;
  };
}

export default LeaderboardService;
