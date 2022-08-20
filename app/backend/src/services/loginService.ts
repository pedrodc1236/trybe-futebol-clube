import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/UserModel';
import { IUserRole } from '../interfaces';

type Login = {
  email: string;
  password: string;
};

type error = {
  code: number;
  message: string;
};

class LoginService {
  private _validateBody = async (body: Login) => {
    const { email, password } = body;

    if (!email || !password) {
      return { code: 400, message: 'All fields must be filled' };
    }
    const userValid = await Users.findOne({ where: { email } });
    const userPassword = userValid ? await bcrypt.compare(password, userValid.password) : false;
    if (!userValid || !userPassword) return { code: 401, message: 'Incorrect email or password' };

    return {};
  };

  public authLogin = async (body: Login): Promise<string | error> => {
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
    const user = await Users.findOne({ where: { email } });

    const role = user?.getDataValue('role');

    return { role };
  };
}

export default LoginService;
