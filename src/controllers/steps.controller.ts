// steps.controller.ts

import { Request, Response } from "express";
import { StepsService } from "../services/steps.service";
import { validationResult } from "express-validator";

/**
 * Récupérer toutes les étapes
 */
export const getAllSteps = async (_req: Request, res: Response) => {
  try {
    const steps = await StepsService.getAllSteps();
    res.status(200).json(steps);
  } catch (error) {
    console.error("Erreur lors de la récupération des étapes :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer une étape par son ID
 */
export const getStepById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const step = await StepsService.getStepById(id);
    if (!step) {
      return res.status(404).json({ message: `Étape avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(step);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étape :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Ajouter une nouvelle étape
 */
export const createStep = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const stepData = req.body;
    const newStep = await StepsService.addStep(stepData);
    res.status(201).json({ message: "Étape ajoutée avec succès", stepId: newStep.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'étape :", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de l'étape" });
  }
};

/**
 * Mettre à jour une étape existante
 */
export const updateStep = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    await StepsService.updateSteps(id, updateData);
    res.status(200).json({ message: `Étape ${id} mise à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étape :", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'étape" });
  }
};

/**
 * Supprimer une étape
 */
export const deleteStep = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await StepsService.deleteSteps(id);
    res.status(200).json({ message: `Étape ${id} supprimée avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étape :", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de l'étape" });
  }
};
