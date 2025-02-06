// users.service.ts

import User from "../schemes/user.scheme"; 
import Auth from "../schemes/auth.scheme"
import sequelize from "../database";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
const SALT = process.env.SALT;


export class UsersLoginService {

  static async connectUser(login: string, passwd: string) {  
    console.log(typeof sequelize.define);
    Auth.findAll({
      where: {
        id: 1,
      },
    });
   
  
  
    return { login: login };
  }
}
