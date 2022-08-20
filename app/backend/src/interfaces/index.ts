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
