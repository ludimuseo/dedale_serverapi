import { Request, Response, NextFunction } from 'express';
import { User } from '../schemes/user.scheme';

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: number;
    role: string;
  };
}

const jwt = require('jsonwebtoken');

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    const UserRole = await User.findOne({
      where: { id: userId },
    });

    (req as AuthenticatedRequest).auth = {
      userId: decodedToken.userId,
      role: UserRole ? UserRole.role ?? 'user' : 'user',
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'tokenError' });
  }
};

export default authMiddleware;
