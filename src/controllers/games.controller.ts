// games.controller.ts

import { Request, Response } from "express";
import { GamesService } from "../services/games.service";
import { validationResult } from "express-validator";

/**
 * Récupérer la liste des jeux
 */
export const getAllGames = async (_req: Request, res: Response) => {
  try {
    const games = await GamesService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer un jeu par son ID
 */
export const getGameById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const game = await GamesService.getGameById(id);
    if (!game) {
      return res.status(404).json({ message: `Jeu avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu par ID :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Ajouter un nouveau jeu
 */
export const createGame = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gameData = req.body;
    const newGame = await GamesService.addGame(gameData);
    res.status(201).json({ message: "Jeu ajouté avec succès", gameId: newGame.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du jeu :", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du jeu" });
  }
};

/**
 * Mettre à jour un jeu existant
 */
export const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await GamesService.updateGame(id, req.body);
    res.status(200).json({ message: `Jeu ${id} mis à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du jeu :", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du jeu" });
  }
};

/**
 * Supprimer un jeu
 */
export const deleteGame = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await GamesService.deleteGame(id);
    res.status(200).json({ message: `Jeu ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du jeu :", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du jeu" });
  }
};
