import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import { ReqUser, IUserEmail } from '../interfaces';

class LoginController {
  loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  login = async (req: Request, res: Response) => {
    const { body } = req;
    const loginValid = await this.loginService.authLogin(body);

    if (typeof loginValid === 'object') {
      return res.status(loginValid.code).json({ message: loginValid.message });
    }

    const token = loginValid;

    res.status(200).json({ token });
  };

  validateLogin = async (req: ReqUser, res: Response) => {
    const { email } = req.user as IUserEmail;

    const user = await this.loginService.validateLogin(email);

    res.status(200).json({ role: user?.role });
  };
}

export default LoginController;
