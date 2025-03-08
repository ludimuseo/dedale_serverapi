import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: number;
    role: string;
  };
}

const noMobile = (req: Request, res: Response, next: NextFunction) => {
  try {
    if ((req as AuthenticatedRequest).auth.role == 'MOBILE') {
      res.status(403).json();
      return;
    } else {
      next();
    }
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
};

export default noMobile;
