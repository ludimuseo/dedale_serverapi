// games.service.ts

import { db } from "../config/firebase.config";
import { Game } from "../schemes/games.scheme";

export class GamesService {
  // Récupérer tous les jeux
  static async getAllGames(): Promise<Game[]> {
    try {
      const snapshot = await db.collection("games").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as unknown as Game[];
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
      throw error;
    }
  }

  // Récupérer un jeu par son ID
  static async getGameById(id: string): Promise<Game | null> {
    try {
      const doc = await db.collection("games").doc(id).get();
      if (!doc.exists) {
        throw new Error("Jeu introuvable");
      }
      return doc.data() as Game;
    } catch (error) {
      console.error("Erreur lors de la récupération du jeu :", error);
      throw error;
    }
  }

  // Ajouter un nouveau jeu
  static async addGame(gameData: Game): Promise<void> {
    try {
      await db.collection("games").add(gameData);
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu :", error);
      throw error;
    }
  }

  // Mettre à jour un jeu existant
   static async updateGame(id: string, updateData: Partial<Game>): Promise<void> {
    try {
      await db.collection("games").doc(id).update(updateData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du jeu :", error);
      throw error;
    }
  }

  // Supprimer un jeu
  static async deleteGame(id: string): Promise<void> {
    try {
      await db.collection("games").doc(id).delete();
    } catch (error) {
      console.error("Erreur lors de la suppression du jeu :", error);
      throw error;
    }
  }
}
