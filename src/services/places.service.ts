//places.service.ts

import { db } from "../config/firebase.config";
import { PlaceScheme } from "../schemes/places.scheme";

//   Définition de la classe PlacesService qui gère les opérations sur places
export class PlacesService {
  // Récupérer toutes les lieux
  static async getAllPlaces(): Promise<(PlaceScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection("places").get();
     return snapshot.docs.map((doc) => ({
             id: doc.id,
             ...doc.data(),
           }) as PlaceScheme & { id: string });
         } catch (error) {
           console.error("Erreur lors de la récupération des lieux:", error);
           throw error;
         }
       }
// Récupérer un lieu par son ID
static async getPlaceById(id: string): Promise<(PlaceScheme & { id: string }) | null> {
  try {
    const doc = await db.collection("places").doc(id).get();
    if (!doc.exists) {
      console.warn(`Lieu avec l'ID ${id} introuvable.`);
      return null;
    }
    return { id: doc.id, ...doc.data() } as PlaceScheme & { id: string };
        } catch (error) {
          console.error(`Erreur lors de la récupération du lieu avec l'ID ${id}:`, error);
          throw error;
        }
}

  // Ajouter un nouveau lieu
  static async addPlace(placeData: PlaceScheme): Promise<{ id: string }> { // On retourne l'ID du lieu
    try {
     const docRef = await db.collection("places").add(placeData);
     return { id: docRef.id };
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu:", error);
      throw error;
    }
  }
  
  // Mettre à jour un lieu existant
  static async updatePlace(id: string, updateData: Partial<PlaceScheme>):Promise<void>  {
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
  static async deletePlace(id: string):Promise<void> {
    try {
      await db.collection("places").doc(id).delete();
    } catch (error) {
      console.error("Erreur lors de la suppression du lieu:", error);
      throw error;
    }
  }
}
