// places.service.ts

import Place, { PlaceCreationAttributes } from "../models/places.model";

export class PlacesService {
  // Récupérer tous les lieux
  static async getAllPlaces(): Promise<Place[]> {
    try {
      return await Place.findAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux :", error);
      throw error;
    }
  }

  // Récupérer un lieu par son ID
  static async getPlaceById(id: number): Promise<Place | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Lieu avec l'ID ${id} introuvable.`);
        return null;
      }
      return place;
    } catch (error) {
      console.error(`Erreur lors de la récupération du lieu avec l'ID ${id} :`, error);
      throw error;
    }
  }

  // Ajouter un nouveau lieu
  static async addPlace(placeData: PlaceCreationAttributes): Promise<Place> {
    try {
      // ✅ Vérification stricte de 'type'
      if (!placeData.type) {
        throw new Error("Le champ 'type' est obligatoire.");
      }

      const newPlace = await Place.create(placeData);
      return newPlace;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un lieu :", error);
      throw error;
    }
  }

  // Mettre à jour un lieu existant
  static async updatePlace(id: number, updateData: Partial<PlaceCreationAttributes>): Promise<Place | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Lieu avec l'ID ${id} introuvable.`);
        return null;
      }
      await place.update(updateData);
      return place;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du lieu avec l'ID ${id} :`, error);
      throw error;
    }
  }

  // Supprimer un lieu
  static async deletePlace(id: number): Promise<{ message: string } | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Lieu avec l'ID ${id} introuvable.`);
        return null;
      }
      await place.destroy();
      return { message: `Lieu avec l'ID ${id} supprimé.` };
    } catch (error) {
      console.error(`Erreur lors de la suppression du lieu avec l'ID ${id} :`, error);
      throw error;
    }
  }
}
