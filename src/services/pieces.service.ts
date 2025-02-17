//pieces.service.ts

import Piece from "../schemes/piece.scheme";

export class PieceService {
  // Retrieve all pieces
  static async getAllPieces(): Promise<InstanceType<typeof Piece>[]> {
    try {
      return await Piece.findAll();
    } catch (error) {
      console.error("Error retrieving pieces:", error);
      throw error;
    }
  }

  // Retrieve a piece by ID
  static async getPieceById(id: number): Promise<InstanceType<typeof Piece> | null> {
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
  static async addPiece(pieceData: any): Promise<InstanceType<typeof Piece>> {
    try {
      const newPiece = await Piece.create(pieceData);
      return newPiece;
    } catch (error) {
      console.error("Error adding piece:", error);
      throw error;
    }
  }

  // Update an existing piece
  static async updatePiece(id: number, updateData: any): Promise<InstanceType<typeof Piece> | null> {
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
