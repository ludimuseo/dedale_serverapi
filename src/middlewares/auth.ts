import { Request, Response, NextFunction } from 'express';
import { User } from "../schemes/user.scheme";

interface AuthRequest extends Request {
    auth: {
        userId: any;
        role?: string; // Add role in req.auth
    };
}

const jwt = require('jsonwebtoken');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

module.exports = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];
        // If no token, return error
        if(!token) {return res.status(401).json({ message: "Invalid Token" })};
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        // Verify Token validyti
        !userId ? res.status(401).json({ message: "Invalid Token" }) : null; 

        // Find role by userid stored in token
        const UserRole = await User.findOne({
            where: { id: userId },
          });

        req.auth = {
            userId: userId,
            role: UserRole?.role,
        };
        next();
    } catch(error) {
        res.status(401).json({ message: "tokenError" });
    }
};