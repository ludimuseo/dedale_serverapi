// users.service.ts

import { db } from "../config/firebase.config";
import { UserScheme } from "../schemes/users.scheme"; 


export class UsersService {
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
