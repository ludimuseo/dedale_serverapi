//steps.routes.ts

import { Router } from "express";
import {
  getAllSteps,
  getStepById,
  createStep,
  updateStep,
  deleteStep,
} from "../controllers/steps.controller";
import { validateId } from "../middlewares/validation";

const router = Router();

router.get("/list", getAllSteps);
router.get("/find/:id", validateId, getStepById);
router.post("/create", createStep); // Ajouter des validations supplémentaires si nécessaire
router.patch("/update/:id", validateId, updateStep); // Ajouter des validations supplémentaires si nécessaire
router.delete("/delete/:id", validateId, deleteStep);

export default router;
