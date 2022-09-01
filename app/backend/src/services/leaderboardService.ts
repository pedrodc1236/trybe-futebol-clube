import { ILeaderboard, IMatch, ITeam } from '../interfaces';

type balanceMatch = {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
};

type goalsType = {
  goalsFavor: number,
  goalsOwn: number,
};

class LeaderboardService {
  private teamHomeMatches = (team: ITeam, matches: IMatch[]) => {
    const filteredMatches = matches.filter((match) => match.homeTeam === team.id);

    return filteredMatches;
  };

  private teamAwayMatches = (team: ITeam, matches: IMatch[]) => {
    const filteredMatches = matches.filter((match) => match.awayTeam === team.id);

    return filteredMatches;
  };

  private matchBalanceHome = (allMatchesTeamHome: IMatch[]) => {
    const balance = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    allMatchesTeamHome.forEach((match) => {
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

  private matchBalanceAway = (allMatchesTeamAway: IMatch[]) => {
    const balance = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    allMatchesTeamAway.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        balance.totalVictories += 1;
      }

      if (match.awayTeamGoals < match.homeTeamGoals) {
        balance.totalLosses += 1;
      }

      if (match.awayTeamGoals === match.homeTeamGoals) {
        balance.totalDraws += 1;
      }
    });

    return balance;
  };

  private countPoints = (balanceTeam: balanceMatch) => {
    const { totalVictories, totalDraws } = balanceTeam;

    return (totalVictories * 3) + totalDraws;
  };

  private goalsForAndAgainstHome = (allMatchesTeamHome: IMatch[]) => {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    allMatchesTeamHome.forEach((match) => {
      goals.goalsFavor += match.homeTeamGoals;
      goals.goalsOwn += match.awayTeamGoals;
    });

    return goals;
  };

  private goalsForAndAgainstAway = (allMatchesTeamAway: IMatch[]) => {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    allMatchesTeamAway.forEach((match) => {
      goals.goalsFavor += match.awayTeamGoals;
      goals.goalsOwn += match.homeTeamGoals;
    });

    return goals;
  };

  public leaderboardHome = async (team: ITeam, matches: IMatch[]): Promise<ILeaderboard> => {
    const allMatchesTeamHome = this.teamHomeMatches(team, matches);

    const balanceTeam = this.matchBalanceHome(allMatchesTeamHome);

    const { totalVictories, totalDraws, totalLosses } = balanceTeam;

    const points = this.countPoints(balanceTeam);

    const goals = this.goalsForAndAgainstHome(allMatchesTeamHome);

    const { goalsFavor, goalsOwn } = goals;

    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: allMatchesTeamHome.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((points / (allMatchesTeamHome.length * 3)) * 100).toFixed(2)),
    };
  };

  public leaderboardAway = async (team: ITeam, matches: IMatch[]): Promise<ILeaderboard> => {
    const allMatchesTeamAway = this.teamAwayMatches(team, matches);

    const balanceTeam = this.matchBalanceAway(allMatchesTeamAway);

    const { totalVictories, totalDraws, totalLosses } = balanceTeam;

    const points = this.countPoints(balanceTeam);

    const goals = this.goalsForAndAgainstAway(allMatchesTeamAway);

    const { goalsFavor, goalsOwn } = goals;

    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: allMatchesTeamAway.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((points / (allMatchesTeamAway.length * 3)) * 100).toFixed(2)),
    };
  };

  private sunBalance = (balanceHome: balanceMatch, balanceAway: balanceMatch) => {
    const newBalance = {
      totalVictories: balanceHome.totalVictories + balanceAway.totalVictories,
      totalDraws: balanceHome.totalDraws + balanceAway.totalDraws,
      totalLosses: balanceHome.totalLosses + balanceAway.totalLosses,
    };

    return newBalance;
  };

  private sunGoals = (goalsForHome: goalsType, goalsForAway: goalsType): goalsType => {
    const goals = {
      goalsFavor: goalsForHome.goalsFavor + goalsForAway.goalsFavor,
      goalsOwn: goalsForHome.goalsOwn + goalsForAway.goalsOwn,
    };

    return goals;
  };

  private utilBalanceTeam = (allMatchesHome: IMatch[], allMatchesAway: IMatch[]) => {
    const balanceHome = this.matchBalanceHome(allMatchesHome);
    const balanceAway = this.matchBalanceAway(allMatchesAway);

    const balanceTeam = this.sunBalance(balanceHome, balanceAway);

    return balanceTeam;
  };

  private utilGoals = (allMatchesHome: IMatch[], allMatchesAway: IMatch[]) => {
    const goalsHome = this.goalsForAndAgainstHome(allMatchesHome);
    const goalsAway = this.goalsForAndAgainstAway(allMatchesAway);
    const goals = this.sunGoals(goalsHome, goalsAway);

    return goals;
  };

  public leaderboard = async (team: ITeam, matches: IMatch[]): Promise<ILeaderboard> => {
    const allMatchesTeamHome = this.teamHomeMatches(team, matches);
    const allMatchesTeamAway = this.teamAwayMatches(team, matches);

    const balanceTeam = this.utilBalanceTeam(allMatchesTeamHome, allMatchesTeamAway);

    const points = this.countPoints(balanceTeam);

    const goals = this.utilGoals(allMatchesTeamHome, allMatchesTeamAway);

    const sunMatches = allMatchesTeamHome.length + allMatchesTeamAway.length;
    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: allMatchesTeamHome.length + allMatchesTeamAway.length,
      totalVictories: balanceTeam.totalVictories,
      totalDraws: balanceTeam.totalDraws,
      totalLosses: balanceTeam.totalLosses,
      goalsFavor: goals.goalsFavor,
      goalsOwn: goals.goalsOwn,
      goalsBalance: goals.goalsFavor - goals.goalsOwn,
      efficiency: Number(((points / (sunMatches * 3)) * 100).toFixed(2)),
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
