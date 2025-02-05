// medals.routes.ts

import { Router } from "express";
import {
  getAllMedals,
  getMedalById,
  createMedal,
  updateMedal,
  deleteMedal,
} from "../controllers/medals.controller";
import { validateId } from "../middlewares/validation";

const router = Router();

router.get("/list", getAllMedals);
router.get("/find/:id", validateId, getMedalById);
router.post("/create", createMedal); // Ajouter des validations supplémentaires si nécessaire
router.patch("/update/:id", validateId, updateMedal); // Ajouter des validations supplémentaires si nécessaire
router.delete("/delete/:id", validateId, deleteMedal);

export default router;
