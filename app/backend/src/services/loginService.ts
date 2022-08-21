import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { IUserRole, Error } from '../interfaces';

type Login = {
  email: string;
  password: string;
};

class LoginService {
  private _validateBody = async (body: Login) => {
    const { email, password } = body;

    if (!email || !password) {
      return { code: 400, message: 'All fields must be filled' };
    }
    const userValid = await User.findOne({ where: { email } });
    const userPassword = userValid ? await bcrypt.compare(password, userValid.password) : false;
    if (!userValid || !userPassword) return { code: 401, message: 'Incorrect email or password' };

    return {};
  };

  public authLogin = async (body: Login): Promise<string | Error> => {
    const validate = await this._validateBody(body);

    if (validate.message) return validate;

    const payload = {
      email: body.email,
    };

    const token = sign(payload, process.env.JWT_SECRET || 'jwt_secret', {
      expiresIn: '7d',
    });

    return token;
  };

  public validateLogin = async (email: string): Promise<IUserRole | undefined> => {
    const user = await User.findOne({ where: { email } });

    const role = user?.getDataValue('role');

    return { role };
  };
}

export default LoginService;
