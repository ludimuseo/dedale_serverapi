// medals.controller.ts

import { Request, Response } from "express";
import { MedalsService } from "../services/medals.service";
import { validationResult } from "express-validator";

/**
 * Récupérer toutes les médailles
 */
export const getAllMedals = async (_req: Request, res: Response) => {
  try {
    const medals = await MedalsService.getAllMedals();
    res.status(200).json(medals);
  } catch (error) {
    console.error("Erreur lors de la récupération des médailles :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer une médaille par son ID
 */
export const getMedalById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const medal = await MedalsService.getMedalById(id);
    if (!medal) {
      return res.status(404).json({ message: `Médaille avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(medal);
  } catch (error) {
    console.error("Erreur lors de la récupération de la médaille :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Ajouter une nouvelle médaille
 */
export const createMedal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const medalData = req.body;
    const newMedal = await MedalsService.addMedal(medalData);
    res.status(201).json({ message: "Médaille ajoutée avec succès", medalId: newMedal.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la médaille :", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de la médaille" });
  }
};

/**
 * Mettre à jour une médaille existante
 */
export const updateMedal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    await MedalsService.updateMedal(id, updateData);
    res.status(200).json({ message: `Médaille ${id} mise à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la médaille :", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de la médaille" });
  }
};

/**
 * Supprimer une médaille
 */
export const deleteMedal = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await MedalsService.deleteMedal(id);
    res.status(200).json({ message: `Médaille ${id} supprimée avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression de la médaille :", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de la médaille" });
  }
};
