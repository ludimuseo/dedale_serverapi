// import Auth_Log from '../schemes/auth_log.scheme';
import { User } from '../schemes';
import Auth_Log from '../schemes/auth_log.scheme';
import { AuthenticatedRequest } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class securedLogs {
  static async logs(req: AuthenticatedRequest) {
    // Route only for SUPERADMIN role !!!!!!!!!!!!!!!
    const user = await User.findOne({
      where: { id: req.auth.userId },
    });
    if (user?.dataValues.role === 'SUPERADMIN') {
      // OK return logs
      interface RequestBody {
        length?: number;
        offset?: number;
      }
      const body = req.body as RequestBody;
      const length = typeof body.length === 'number' ? body.length : 20;
      const offset = typeof body.offset === 'number' ? body.offset : 5; // Default 5 if not specified
      const logs = await Auth_Log.findAll({
        offset: offset,
        limit: length,
        order: [['login_attempt', 'DESC']],
      });
      console.log(offset);

      // Fonction to mask IP
      const maskIp = (ip: string): string => {
        if (!ip) return 'Unknown';

        // Extraction de l'IPv4 réelle si encapsulée en IPv6 (::ffff:x.x.x.x)
        const cleanIp = ip.includes('::ffff:') ? ip.split('::ffff:')[1] : ip;

        if (cleanIp.includes('.')) {
          // Masquage IPv4 : Ex. "192.168.1.100" -> "192.***.***.100"
          const parts = cleanIp.split('.');
          return `${parts[0]}.***.***.${parts[3]}`;
        } else if (cleanIp.includes(':')) {
          // Masquage IPv6 : Ex. "2001:db8::1" -> "2001:****::****"
          const parts = cleanIp.split(':');
          return `${parts[0]}:****::****`;
        }
        return cleanIp;
      };

      const dataLogs = logs.map((log) => ({
        timestamp: log.dataValues.login_attempt,
        ip_adresse: maskIp(log.dataValues.ip_adresse),
        useragent: log.dataValues.user_agent,
        status: log.dataValues.status,
        reason: log.dataValues.reason,
        authId: log.dataValues.authId,
      }));
      //   console.log(logs);

      return dataLogs;
    } else {
      return { error: 'Accées non autorisée', statusCode: 403 };
    }
  }
}
