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
