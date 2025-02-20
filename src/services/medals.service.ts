// medals.service.ts

import  { Medal, MedalAttributes, MedalCreationAttributes } from "../models/medals.model";

export class MedalService {
  // Récupérer toutes les médailles
  static async getAllMedals(): Promise<Medal[]> {
    try {
      return await Medal.findAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des médailles :", error);
      throw error;
    }
  }

  // Récupérer une médaille par ID
  static async getMedalById(id: number): Promise<Medal | null> {
    try {
      return await Medal.findByPk(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la médaille ID ${id} :`, error);
      throw error;
    }
  }

  // Ajouter une médaille
  static async addMedal(medalData: MedalCreationAttributes): Promise<Medal> {
    try {
      return await Medal.create(medalData);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une médaille :", error);
      throw error;
    }
  }

  // Mettre à jour une médaille
  static async updateMedal(id: number, updateData: Partial<MedalAttributes>): Promise<Medal | null> {
    try {
      const medal = await Medal.findByPk(id);
      if (!medal) {
        console.warn(`Médaille avec l'ID ${id} introuvable.`);
        return null;
      }
      await medal.update(updateData);
      return medal;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la médaille ID ${id} :`, error);
      throw error;
    }
  }

  // Supprimer une médaille
  static async deleteMedal(id: number): Promise<boolean> {
    try {
      const deleted = await Medal.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la médaille ID ${id} :`, error);
      throw error;
    }
  }
}
