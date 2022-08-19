import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../models/UserModel';

type Login = {
  email: string;
  password: string;
};

type error = {
  code: number;
  message: string;
};

class LoginService {
  validateBody = async (body: Login) => {
    const { email, password } = body;

    if (!email || !password) {
      return { code: 400, message: 'Some required fields are missing' };
    }
    const userValid = await Users.findOne({ where: { email } });
    const userPassword = userValid ? await bcrypt.compare(password, userValid.password) : false;
    if (!userValid || !userPassword) return { code: 401, message: 'Incorrect email or password' };

    return {};
  };

  public authLogin = async (body: Login): Promise<string | error> => {
    const validate = await this.validateBody(body);

    if (validate.message) return validate;

    const payload = {
      email: body.email,
    };

    const token = sign(payload, process.env.JWT_SECRET || 'jwt_secret', {
      expiresIn: '7d',
    });

    return token;
  };
}

export default LoginService;
