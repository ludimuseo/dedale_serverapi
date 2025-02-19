// journeys.service.ts

import { db } from '../config/firebase.config';
import { JourneyScheme } from '../schemes/journeys.scheme';

export class JourneysService {
  // Récupérer tous les parcours
  static async getAllJourneys(): Promise<(JourneyScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection('journeys').get();
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as JourneyScheme & { id: string }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des journeys:', error);
      throw error;
    }
  }

  // Récupérer un parcours par son ID
  static async getJourneyById(
    id: string
  ): Promise<(JourneyScheme & { id: string }) | null> {
    try {
      const doc = await db.collection('journeys').doc(id).get();
      if (!doc.exists) {
        console.warn(`Journey avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as JourneyScheme & { id: string };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du parcours avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Ajouter une nouveau parcours
  static async addJourney(journeyData: JourneyScheme): Promise<{ id: string }> {
    // On retourne l'ID du parcours
    try {
      const docRef = await db.collection('journeys').add(journeyData);
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout du parcours:", error);
      throw error;
    }
  }

  // Mettre à jour un parcours existant
  static async updateJourney(
    id: string,
    updateData: Partial<JourneyScheme>
  ): Promise<void> {
    try {
      await db.collection('journeys').doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du parcours:', error);
      throw error;
    }
  }

  // Supprimer un parcours
  static async deleteJourney(id: string): Promise<void> {
    try {
      await db.collection('journeys').doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression du parcours:', error);
      throw error;
    }
  }
}
