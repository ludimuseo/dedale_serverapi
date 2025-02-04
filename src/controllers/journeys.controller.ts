// journeys.controller.ts

import { Request, Response } from "express";
import { JourneysService } from "../services/journeys.service";
import { validationResult } from "express-validator";

/**
 * Récupérer tous les parcours
 */
export const getAllJourneys = async (_req: Request, res: Response) => {
  try {
    const journeys = await JourneysService.getAllJourneys();
    res.status(200).json(journeys);
  } catch (error) {
    console.error("Erreur lors de la récupération des parcours :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer un parcours par son ID
 */
export const getJourneyById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const journey = await JourneysService.getJourneyById(id);
    if (!journey) {
      return res.status(404).json({ message: `Journey avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(journey);
  } catch (error) {
    console.error("Erreur lors de la récupération du parcours :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Ajouter un nouveau parcours
 */
export const createJourney = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const journeyData = req.body;
    const newJourney = await JourneysService.addJourney(journeyData);
    res.status(201).json({ message: "Journey ajoutée avec succès", journeyId: newJourney.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du parcours :", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du parcours" });
  }
};

/**
 * Mettre à jour un parcours existant
 */
export const updateJourney = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    await JourneysService.updateJourney(id, updateData);
    res.status(200).json({ message: `Journey ${id} mise à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du parcours :", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du parcours" });
  }
};

/**
 * Supprimer un parcours
 */
export const deleteJourney = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await JourneysService.deleteJourney(id);
    res.status(200).json({ message: `Journey ${id} supprimée avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du parcours :", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du parcours" });
  }
};
