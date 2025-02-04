//pieces.routes.ts

import { Router } from "express";
import {
  getAllPieces,
  getPieceById,
  createPiece,
  updatePiece,
  deletePiece,
} from "../controllers/pieces.controller";
import { validateId } from "../middlewares/validation";

const router = Router();

router.get("/list", getAllPieces);
router.get("/find/:id", validateId, getPieceById);
router.post("/create", createPiece); // Ajouter des validations supplémentaires si nécessaire
router.patch("/update/:id", validateId, updatePiece); // Ajouter des validations supplémentaires si nécessaire
router.delete("/delete/:id", validateId, deletePiece);

export default router;

