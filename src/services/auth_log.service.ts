import Auth_Log from '../schemes/auth_log.scheme';
import type { AuthenticatedRequest } from '../utils/types';

export class AuthLog {
  static async save(
    req?: AuthenticatedRequest,
    reason?: string,
    userId?: number
  ) {
    const timestamp: number = Math.floor(Date.now() / 1000);
    const authId = req?.auth?.userId ?? userId;

    await Auth_Log.create({
      login_attempt: timestamp,
      ip_adresse: req?.ip ?? 'undefined',
      user_agent: req?.headers['user-agent'] ?? 'Unknown',
      status: reason ?? 'FAILURE',
      reason: req?.originalUrl,
      authId: authId,
    });
  }
}
