// users.service.ts

import { db } from "../config/firebase.config";
import { Request } from "express";
import { UserScheme } from "../schemes/users.scheme"; 

import { Auth } from "../schemes/auth.scheme";
import  Auth_Log  from "../schemes/auth_log.scheme";
import { User } from "../schemes/user.scheme";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
const SALT = process.env.SALT;


export class UsersService {
  // Login d'un user
  static async connectUser(req: Request) {
    const timestamp: number = Math.floor(Date.now() / 1000);
    let success = false;
    let successStatus = "";
    let data;
    let userID;
    let reason;
    let isMatch;

    const authUser = await Auth.findOne({
      where: { email: req.body.login },
      include: [{
        model: User,
        required: true,  // Assurez-vous que User est chargé avec Auth
      }],
    });


    // Accéder aux attributs de l'utilisateur lié à Auth
    const user = authUser?.get("user");  // Move user info in to user
    userID = user?.id;
    
  
    // console.log(user?.isActive);
    if(authUser){isMatch = await bcrypt.compare(req.body.passwd, authUser.password);}
    
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
      ip_adresse: req.ip ?? "undefined",
      user_agent: req.headers["user-agent"] ?? "undefined",
      status: successStatus,
      reason: reason,
      authId: userID
    });

    if(data){return data;}
    else if(!authUser){return null;}
    else if(!user?.isActive){return "isActiveFalse";}
    else{return null;}

  };

  // Récupérer tous les utilisateurs
  static async getAllUsers(): Promise<(UserScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection("users").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as UserScheme & { id: string });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
  }

  // Récupérer un utilisateur par son ID
  static async getUserById(
    id: string
  ): Promise<(UserScheme & { id: string }) | null> {
    try {
      const doc = await db.collection("users").doc(id).get();
      if (!doc.exists) {
        console.warn(`Utilisateur avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as UserScheme & { id: string };
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // Ajouter un nouvel utilisateur
  static async addUser(
    userData: UserScheme
  ): Promise<{ id: string }> { // On retourne l'ID du user
    try {
      const docRef = await db.collection("users").add(userData); 
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      throw error;
    }
  }

// Mettre à jour un utilisateur existant
static async updateUser(
  id: string,
  updateData: Partial<UserScheme>
): Promise<void> {
  try {
    await db.collection("users").doc(id).update(updateData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
}


  // Supprimer un utilisateur
  static async deleteUser(id: string): Promise<void> {
    try {
      await db.collection("users").doc(id).delete(); 
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  }
}
