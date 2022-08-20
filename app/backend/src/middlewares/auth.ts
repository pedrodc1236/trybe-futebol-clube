import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ReqUser } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const authMiddleware = (req: ReqUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = verify(token, secret);
    const email = Object.values(decoded)[0];

    req.user = { email };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default authMiddleware;
