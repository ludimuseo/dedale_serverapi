// import Auth_Log from '../schemes/auth_log.scheme';
import { AuthenticatedRequest } from '../utils/types';

export class securedLogs {
  static async logs(req: AuthenticatedRequest) {
    if (!req.auth) {
      throw new Error('Authentification requise');
    }
    // Route only for SUPERADMIN role !!!!!!!!!!!!!!!

    return { error: 'logs......' };
  }
}
