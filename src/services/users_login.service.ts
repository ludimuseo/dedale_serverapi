// users.service.ts

import { Auth } from "../schemes/auth.scheme";
import { User } from "../schemes/user.scheme";
import sequelize from "../database";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
const SALT = process.env.SALT;


export class UsersLoginService {
  static async connectUser(login: string, passwd: string) {
    
    const authUser = await Auth.findOne({
      where: { email: login },
      include: [{
        model: User,
        required: true,  // Assurez-vous que User est chargé avec Auth
      }],
    });

    if (!authUser) return null; // No user found in DB

    // Accéder aux attributs de l'utilisateur lié à Auth
    const user = authUser.get("user");  // Move user info in to user

    // If user disable
    if(!user?.isActive){ return "isActiveFalse";}

    // console.log(user?.name);  // Exemple d'accès aux propriétés de User

    const isMatch = await bcrypt.compare(passwd, authUser.password);
    if (isMatch) {

      // Update the time of connection
      const timestamp = new Date();
      Auth.update(
        { log: timestamp },  // Nouveau timestamp pour le champ 'log'
        {
          where: {
            id: authUser.id  // Condition pour sélectionner l'enregistrement
          }
        }
      )

      // Gen jwt token
      const tokenUser = jwt.sign(
        { userId: authUser.id },
        RANDOM_TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRES_IN }
      );
      
      const data = { 
        userId: authUser.id,
        token: tokenUser,
        name: user?.name,
        firstname: user?.firstname,
        pseudo: user?.pseudo,
        avatar: user?.avatar,
        isContrast: user?.isContrast,
        isFalc: user?.isFalc,
        fontsize: user?.fontsize,
        language: user?.language,
        tutorial: user?.tutorial,
        role: user?.role,
      };
      return data;
    } else {
      return null;
    }
  };
}
   
