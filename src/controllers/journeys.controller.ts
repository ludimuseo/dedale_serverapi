// journeys.controller.ts

import { Request, Response, NextFunction } from "express";
import { JourneyService } from "../services/journeys.service";
import { validationResult } from "express-validator";
import Journey from "../models/journeys.model";

/**
 * Récupérer tous les parcours
 */
export const getAllJourneys = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const journeys = await JourneyService.getAllJourneys();
    res.status(200).json(journeys);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer un parcours par son ID
 */
export const getJourneyById = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.id, 10); 
    const journey = await JourneyService.getJourneyById(id);
    if (!journey) {
      return res.status(404).json({ message: `Journey avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(journey);
  } catch (error) {
    next(error);
  }
};

/**
 * Ajouter un nouveau parcours
 */
export const createJourney = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const journeyData = req.body;
    const newJourney = await JourneyService.addJourney(journeyData);
    res.status(201).json({ message: "Journey ajoutée avec succès", journeyId: (newJourney as Journey).id });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un parcours existant
 */
export const updateJourney = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.id, 10); 
    const updateData = req.body;
    await JourneyService.updateJourney(id, updateData);
    res.status(200).json({ message: `Journey ${id} mise à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un parcours
 */
export const deleteJourney = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.id, 10); 
    await JourneyService.deleteJourney(id);
    res.status(200).json({ message: `Journey ${id} supprimée avec succès.` });
  } catch (error) {
    next(error);
  }
};
