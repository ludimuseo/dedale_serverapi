import Auth_Log from '../schemes/auth_log.scheme';
import { AuthenticatedRequest } from '../utils/types';

export class AuthLog {
  static async save(req: AuthenticatedRequest, raison?: string) {
    const timestamp: number = Math.floor(Date.now() / 1000);
    await Auth_Log.create({
      login_attempt: timestamp,
      ip_adresse: req.ip || 'undefined',
      user_agent: req.headers['user-agent'] || 'Unknown',
      status: raison ?? 'FAILURE',
      reason: 'unauthorized: ' + req.url,
      authId: req.auth.userId,
    });
  }
}
