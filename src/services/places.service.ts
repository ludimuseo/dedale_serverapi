//places.service.ts

import { db } from "../config/firebase.config";
import { Place } from "../schemes/places.scheme";

//   Définition de la classe PlacesService qui gère les opérations sur places
export class PlacesService {
  // Récupérer toutes les lieux
  static async getAllPlaces() {
    try {
      const snapshot = await db.collection("places").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux:", error);
      throw error;
    }
  }
  // Ajouter un nouveau lieu
  static async addPlace(placeData: Place) {
    try {
      await db.collection("places").add(placeData);
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu:", error);
      throw error;
    }
  }
  // Mettre à jour un lieu existant
  static async updatePlace(id: string, updateData: Partial<Place>) {
    try {
      await db.collection("places").doc(id).update(updateData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du lieu:", error);
      throw error;
    }
  }
  // Supprimer un lieu
  static async deletePlace(id: string) {
    try {
      await db.collection("places").doc(id).delete();
    } catch (error) {
      console.error("Erreur lors de la suppression du lieu:", error);
      throw error;
    }
  }
}
