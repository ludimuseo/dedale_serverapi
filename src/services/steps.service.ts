//steps.services.ts

import { db } from '../config/firebase.config';
import type { StepScheme } from '../schemes/steps.scheme';

export class StepsService {
  // Récupérer toutes les étapes
  static async getAllSteps(): Promise<(StepScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection('steps').get();
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as StepScheme & { id: string }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des étapes:', error);
      throw error;
    }
  }

  // Récupérer une étape par son ID
  static async getStepById(
    id: string
  ): Promise<(StepScheme & { id: string }) | null> {
    try {
      const doc = await db.collection('steps').doc(id).get();
      if (!doc.exists) {
        console.warn(`Etape avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as StepScheme & { id: string };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'étape avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Ajouter une nouvelle étape
  static async addStep(stepData: StepScheme): Promise<{ id: string }> {
    // On retourne l'ID de l'étape
    try {
      const docRef = await db.collection('steps').add(stepData);
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étape:", error);
      throw error;
    }
  }

  // Mettre à jour une étape existante
  static async updateSteps(
    id: string,
    updateData: Partial<StepScheme>
  ): Promise<void> {
    try {
      await db.collection('steps').doc(id).update(updateData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'étape:", error);
      throw error;
    }
  }

  // Supprimer une étape
  static async deleteSteps(id: string): Promise<void> {
    try {
      await db.collection('steps').doc(id).delete();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étape:", error);
      throw error;
    }
  }
}
