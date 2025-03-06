//pieces.service.ts

import { db } from '../config/firebase.config';
import type { PieceScheme } from '../schemes/pieces.scheme';

export class PiecesService {
  // Récupérer toutes les pièces
  static async getAllPieces(): Promise<(PieceScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection('pieces').get();
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as PieceScheme & { id: string }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des pièces:', error);
      throw error;
    }
  }

  // Récupérer une pièce par son ID
  static async getPieceById(
    id: string
  ): Promise<(PieceScheme & { id: string }) | null> {
    try {
      const doc = await db.collection('pieces').doc(id).get();
      if (!doc.exists) {
        console.warn(`Pièce avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as PieceScheme & { id: string };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la pièce avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Ajouter une nouvelle pièce
  static async addPiece(pieceData: PieceScheme): Promise<{ id: string }> {
    // On retourne l'ID de la pièce
    try {
      const docRef = await db.collection('pieces').add(pieceData);
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout de la pièce:", error);
      throw error;
    }
  }

  // Mettre à jour une pièce existante
  static async updatePiece(
    id: string,
    updateData: Partial<PieceScheme>
  ): Promise<void> {
    try {
      await db.collection('pieces').doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la pièce:', error);
      throw error;
    }
  }

  // Supprimer une pièce
  static async deletePiece(id: string): Promise<void> {
    try {
      await db.collection('pieces').doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la pièce:', error);
      throw error;
    }
  }
}
