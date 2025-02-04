// places.controller.ts

import { Request, Response } from "express";
import { PlacesService } from "../services/places.service";
import { validationResult } from "express-validator";

/**
 * Récupérer tous les lieux
 */
export const getAllPlaces = async (_req: Request, res: Response) => {
  try {
    const places = await PlacesService.getAllPlaces();
    res.status(200).json(places);
  } catch (error) {
    console.error("Erreur lors de la récupération des lieux :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer un lieu par son ID
 */
export const getPlaceById = async (req: Request, res: Response) => {
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
    console.error("Erreur lors de la récupération du lieu :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Ajouter un nouveau lieu
 */
export const createPlace = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const placeData = req.body;
    const newPlace = await PlacesService.addPlace(placeData);
    res.status(201).json({ message: "Lieu ajouté avec succès", placeId: newPlace.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du lieu :", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du lieu" });
  }
};

/**
 * Mettre à jour un lieu existant
 */
export const updatePlace = async (req: Request, res: Response) => {
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
    console.error("Erreur lors de la mise à jour du lieu :", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du lieu" });
  }
};

/**
 * Supprimer un lieu
 */
export const deletePlace = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await PlacesService.deletePlace(id);
    res.status(200).json({ message: `Lieu ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du lieu :", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du lieu" });
  }
};
