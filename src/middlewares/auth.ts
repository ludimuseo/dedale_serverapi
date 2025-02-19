import { Request, Response, NextFunction } from 'express';
import { User } from '../schemes/user.scheme';
import { Auth } from '../schemes/auth.scheme';

interface AuthRequest extends Request {
  auth: {
    userId: number;
    role?: string; // Add role in req.auth
  };
}

const jwt = require('jsonwebtoken');

module.exports = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

    // Verifier si token == a celui de la BDD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const authUser = await Auth.findOne({
    //     where: { email: req },
    //     include: [{
    //       model: User,
    //       required: true,  // Assurez-vous que User est chargé avec Auth
    //     }],
    //   });

    const token = req.headers.authorization?.split(' ')[1];

    // If no token, return error
    if (!token) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    console.log(RANDOM_TOKEN_SECRET);
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Verify Token validyti
    !userId ? res.status(401).json({ message: 'Invalid Token' }) : null;

    // Find role by userid stored in token
    const UserRole = await User.findOne({
      where: { id: userId },
    });

    req.auth = {
      userId: userId,
      role: UserRole?.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'tokenError' });
  }
};
