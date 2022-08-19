import { Request, Response } from 'express';
import LoginService from '../services/loginService';

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
}

export default LoginController;
