import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: number;
    role: string;
  };
}

const noMobile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if((req as AuthenticatedRequest).auth.role == 'MOBILE') {
        res.status(403).json();
        return;
    } else {
        next();
    }
    
  } catch (error) {
    res.status(500).json();
  }
};

export default noMobile;
