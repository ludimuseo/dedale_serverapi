//journeys.route.ts

import { Router } from "express";
import {
  getAllJourneys,
  getJourneyById,
  createJourney,
  updateJourney,
  deleteJourney,
} from "../controllers/journeys.controller";
import { validateId } from "../middlewares/validation";

const router = Router();

router.get("/list", getAllJourneys);
router.get("/find/:id", validateId, getJourneyById);
router.post("/create", createJourney); // Ajouter des validations supplémentaires si nécessaire
router.patch("/update/:id", validateId, updateJourney); // Ajouter des validations supplémentaires si nécessaire
router.delete("/delete/:id", validateId, deleteJourney);

export default router;
