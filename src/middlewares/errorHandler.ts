// errorHandler.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de gestion des erreurs globales
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Erreur capturée :', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(statusCode).json({ message });
};
