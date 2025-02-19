import { Request, Response, NextFunction } from 'express';
import { securedLogs } from '../services/logs.service';
import { validationResult } from 'express-validator';
import { AuthenticatedRequest } from '../utils/types';


/**
 * Créer un nouveau client
 */
export const logs = async ( req: Request, res: Response, next: NextFunction ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
        const authReq = req as AuthenticatedRequest;
      await securedLogs.logs(authReq);
  
    
  
      res.status(201).json({
        message: 'logs.',
      });
    } catch (error) {
      next(error);
    }
  };