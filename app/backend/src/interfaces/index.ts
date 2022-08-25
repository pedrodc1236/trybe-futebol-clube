import { Request } from 'express';

export interface IUserEmail {
  email: string;
}

export interface ReqUser extends Request {
  user?: IUserEmail;
}

export interface IUserRole {
  role: string;
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface Error {
  code: number;
  message: string;
}

export interface IMatch {
  id?:number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string,
  };
  teamAway?: {
    teamName: string,
  };
}

export interface MatchGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface MatchTeamsAndGoals {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
