// medals.service.ts

import { db } from '../config/firebase.config';
import { MedalScheme } from '../schemes/medals.scheme';

export class MedalsService {
  // Récupérer toutes les médailles
  static async getAllMedals(): Promise<(MedalScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection('medals').get();
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as MedalScheme & { id: string }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des médailles:', error);
      throw error;
    }
  }

  // Récupérer une médaille par son ID
  static async getMedalById(
    id: string
  ): Promise<(MedalScheme & { id: string }) | null> {
    try {
      const doc = await db.collection('medals').doc(id).get();
      if (!doc.exists) {
        console.warn(`Médaille avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as MedalScheme & { id: string };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la médaille avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Ajouter une nouvelle médaille
  static async addMedal(medalData: MedalScheme): Promise<{ id: string }> {
    // On retourne l'ID de la médaille
    try {
      const docRef = await db.collection('medals').add(medalData);
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout de la médaille:", error);
      throw error;
    }
  }

  // Mettre à jour une médaille existante
  static async updateMedal(
    id: string,
    updateData: Partial<MedalScheme>
  ): Promise<void> {
    try {
      await db.collection('medals').doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la médaille:', error);
      throw error;
    }
  }

  // Supprimer une médaille
  static async deleteMedal(id: string): Promise<void> {
    try {
      await db.collection('medals').doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la médaille:', error);
      throw error;
    }
  }
}
