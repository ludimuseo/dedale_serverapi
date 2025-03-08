import type { Request, Response, NextFunction } from 'express';
import { User } from '../schemes/user.scheme';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: number;
    role: string;
  };
}

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role?: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
    if (!RANDOM_TOKEN_SECRET) {
      next(new Error('Missing token secret'));
      return;
    }
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      next(new Error('Token missing'));
      return;
    }

    const decodedToken = jwt.verify(
      token,
      RANDOM_TOKEN_SECRET
    ) as unknown as AuthTokenPayload;
    if (typeof decodedToken === 'string') {
      next(new Error('Invalid token'));
      return;
    }

    let userId;
    if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
      userId = (decodedToken as { userId: string }).userId;
    } else {
      next(new Error('User ID missing in token'));
      return;
    }

    const UserRole = await User.findOne({
      where: { id: userId },
    });

    (req as AuthenticatedRequest).auth = {
      userId: decodedToken.userId as unknown as number,
      role: UserRole ? (UserRole.role ?? 'user') : 'user',
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'tokenError' });
    next(error);
  }
};

export default authMiddleware;
