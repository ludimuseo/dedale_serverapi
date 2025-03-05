// users.service.ts
import { StringValue } from 'ms';
import { Auth } from '../schemes/auth.scheme';
import { User } from '../schemes/user.scheme';
import { AuthenticatedRequest } from '../utils/types';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthLog } from './auth_log.service';

const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

export class UsersLoginService {
  static async connectUser(req: AuthenticatedRequest) {
    const timestamp: number = Math.floor(Date.now() / 1000);
    let success = false;
    // @ts-ignore
    let successStatus = '';
    let data;
    // @ts-ignore
    let userID;
    let reason;
    let isMatch;

    const authUser = await Auth.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    // Accéder aux attributs de l'utilisateur lié à Auth
    const user = authUser?.get('user'); // Move user info in to user
    userID = user?.id;

    // console.log(user?.isActive);
    if (authUser) {
      isMatch = await bcrypt.compare(req.body.password, authUser.password);
    }

    if (isMatch && user?.isActive && authUser) {
      // Update the time of connection

      Auth.update(
        { log: timestamp }, // update timestamp pour le champ 'log'
        {
          where: {
            id: authUser.id, // Condition pour sélectionner l'enregistrement
          },
        }
      );

      // Gen jwt token
      if (!RANDOM_TOKEN_SECRET) {
        throw new Error(
          'RANDOM_TOKEN_SECRET is not defined in environment variables.'
        );
      }
      const expiresIn: StringValue = (TOKEN_EXPIRES_IN as StringValue) ?? '20H'; // Default expiration time = 1 day
      const tokenUser = jwt.sign({ userId: authUser.id }, RANDOM_TOKEN_SECRET, {
        expiresIn,
      });

      data = {
        token: tokenUser,
        name: user.name,
        firstname: user.firstname,
        pseudo: user.pseudo,
        avatar: user.avatar,
        isContrast: user.isContrast,
        isFalc: user.isFalc,
        fontsize: user.fontsize,
        language: user.language,
        tutorial: user.tutorial,
        role: user.role,
      };
      userID = authUser.id;
      reason = 'Login success';
      success = true;
    } else {
      reason = 'Password invalid';
      success = false;
    }

    !user?.isActive ? (reason = 'User inactive') : null;
    !authUser ? (reason = 'user not found') : null;

    success ? (successStatus = 'success') : (successStatus = 'failure');

    await AuthLog.save(req, reason);

    if (data) {
      return data;
    } else if (!authUser) {
      return null;
    } else if (!user?.isActive) {
      return 'isActiveFalse';
    } else {
      return null;
    }
  }
}
