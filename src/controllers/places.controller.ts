// places.controller.ts

import { Request, Response,NextFunction } from "express";
import { PlacesService } from "../services/places.service";
import { validationResult } from "express-validator";

/**
 * Récupérer tous les lieux
 */
export const getAllPlaces = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const places = await PlacesService.getAllPlaces();
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer un lieu par son ID
 */
export const getPlaceById = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const place = await PlacesService.getPlaceById(id);
    if (!place) {
      return res.status(404).json({ message: `Lieu avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(place);
  } catch (error) {
    next(error);
  }
};

/**
 * Ajouter un nouveau lieu
 */
export const createPlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const placeData = req.body;
    const newPlace = await PlacesService.addPlace(placeData);
    res.status(201).json({ message: "Lieu ajouté avec succès", placeId: newPlace.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un lieu existant
 */
export const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    await PlacesService.updatePlace(id, updateData);
    res.status(200).json({ message: `Lieu ${id} mis à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un lieu
 */
export const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await PlacesService.deletePlace(id);
    res.status(200).json({ message: `Lieu ${id} supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
