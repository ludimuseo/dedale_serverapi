// pieces.service.ts

import { Model } from "sequelize";
import Piece from "../models/pieces.model";

export class PieceService {
  // Retrieve all pieces
  static async getAllPieces(): Promise<Model[]> {
    try {
      return await Piece.findAll();
    } catch (error) {
      console.error("Error retrieving pieces:", error);
      throw error;
    }
  }

  // Retrieve a piece by ID
  static async getPieceById(id: number): Promise<Model | null> {
    try {
      const piece = await Piece.findByPk(id);
      if (!piece) {
        console.warn(`Piece with ID ${id} not found.`);
        return null;
      }
      return piece;
    } catch (error) {
      console.error(`Error retrieving piece with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new piece
  static async addPiece(pieceData: any): Promise<Model> {
    try {
      const newPiece = await Piece.create(pieceData);
      return newPiece;
    } catch (error) {
      console.error("Error adding piece:", error);
      throw error;
    }
  }

  // Update an existing piece
  static async updatePiece(id: number, updateData: any): Promise<Model | null> {
    try {
      const piece = await Piece.findByPk(id);
      if (!piece) {
        console.warn(`Piece with ID ${id} not found.`);
        return null;
      }
      await piece.update(updateData);
      return piece;
    } catch (error) {
      console.error(`Error updating piece with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a piece
  static async deletePiece(id: number): Promise<{ message: string } | null> {
    try {
      const piece = await Piece.findByPk(id);
      if (!piece) {
        console.warn(`Piece with ID ${id} not found.`);
        return null;
      }
      await piece.destroy();
      return { message: `Piece with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting piece with ID ${id}:`, error);
      throw error;
    }
  }
}

