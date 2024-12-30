//pieces.routes.ts

import { Router } from "express";
import { PiecesService} from "../services/pieces.service";
import { PieceScheme } from "../schemes/pieces.scheme"; 

const router = Router();

// GET - Récupérer la liste des pièces
router.get("/list", async (_req, res) => {
  try {
    const clients = await PiecesService.getAllPieces();
    res.status(200).json(clients);  
  } catch (error) {
    console.error("Erreur lors de la récupération des pièces:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// GET - Récupérer une pièce par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const piece = await PiecesService.getPieceById(id);
    if (!piece) {
      return res.status(404).json({ message: `Pièce avec l'ID ${id} introuvable.` });  
    }
    res.status(200).json(piece); 
  } catch (error) {
    console.error("Erreur lors de la récupération de la pièce par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// POST - Créer un nouvelle pièce
router.post("/create", async (req, res) => {
  try {
    const pieceData: PieceScheme = req.body;
    const newPiece = await PiecesService.addPiece(pieceData);
    res.status(201).json({ message: "Pièce ajouté avec succès", clientId: newPiece.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout de la pièce:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de la pièce"});
  }
});

// PATCH - Mettre à jour une pièce existante
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await PiecesService.updatePiece(id, updateData);
    res.status(200).json({ message: `Pièce ${id} mis à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la pièce:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de la pièce" });  
  }
});

// DELETE - Supprimer une pièce
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PiecesService.deletePiece(id);
    res.status(200).json({ message: `Pièce ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression de la pièce:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de la pièce" });  
  }
});

export default router;
