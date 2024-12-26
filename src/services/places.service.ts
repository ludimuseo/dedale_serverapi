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

// Récupérer un lieu par son ID
static async getPlaceById(id: string): Promise<Place | null> {
  try {
    const doc = await db.collection("places").doc(id).get();
    if (!doc.exists) {
      throw new Error("Lieu introuvable");
    }
    const data = doc.data();
    if (!data) {
      throw new Error("Données du lieu introuvables");
    }

    // Retourne directement les données qui correspondent au modèle Places dans Firestore
    return data as Place;
  } catch (error) {
    console.error("Erreur lors de la récupération du lieu:", error);
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
      // Vérifie que des données ont été envoyées pour la mise à jour
      if (Object.keys(updateData).length === 0) {
        throw new Error("Aucune donnée à mettre à jour");
      }
  
      // Effectuer la mise à jour partielle
      await db.collection("places").doc(id).update(updateData);
  
      console.log(`Place ${id} mise à jour avec succès`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du lieu :");
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
