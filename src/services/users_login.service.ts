// users.service.ts

import { Auth } from "../schemes/auth.scheme";
import  Auth_Log  from "../schemes/auth_log.scheme";
import { User } from "../schemes/user.scheme";

import sequelize from "../config/database";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
const SALT = process.env.SALT;


export class UsersLoginService {
  static async connectUser(login: string, passwd: string, userAgent: any, ipAdress:any) {    
    const timestamp: number = Math.floor(Date.now() / 1000);
    let success = false;
    let successStatus = "";
    let data;
    let userID;
    let reason;
    let isMatch;

    const authUser = await Auth.findOne({
      where: { email: login },
      include: [{
        model: User,
        required: true,  // Assurez-vous que User est chargé avec Auth
      }],
    });


    // Accéder aux attributs de l'utilisateur lié à Auth
    const user = authUser?.get("user");  // Move user info in to user
    userID = user?.id;
    
  
    // console.log(user?.isActive);
    if(authUser){isMatch = await bcrypt.compare(passwd, authUser.password);}
    
    if (isMatch && user?.isActive && authUser) {
      
      // Update the time of connection
      
      Auth.update(
        { log: timestamp },  // update timestamp pour le champ 'log'
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
      
      data = { 
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
      userID = authUser.id;
      reason = "Login succes"
      success = true;
      // return data;
    } else {
      reason = "Password invalid"
      success = false;
      // return null;
    }

    !user?.isActive ? reason = "User inactive" : null;
    !authUser ? reason = "user not found" : null;
    
    success ? successStatus = "succes" : successStatus = "failure"
    
    const auth_Log = await Auth_Log.create({
      login_attempt: timestamp,
      ip_adresse: ipAdress,
      user_agent: userAgent,
      status: successStatus,
      reason: reason,
      authId: userID
    });

    if(data){return data;}
    else if(!authUser){return null;}
    else if(!user?.isActive){return "isActiveFalse";}
    else{return null;}

  };
}
   
