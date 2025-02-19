// games.controller.ts

import { Request, Response, NextFunction } from 'express';
import { GamesService } from '../services/games.service';
import { validationResult } from 'express-validator';

/**
 * Récupérer la liste des jeux
 */
export const getAllGames = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const games = await GamesService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer un jeu par son ID
 */
export const getGameById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const game = await GamesService.getGameById(id);
    if (!game) {
      return res
        .status(404)
        .json({ message: `Jeu avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

/**
 * Ajouter un nouveau jeu
 */
export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gameData = req.body;
    const newGame = await GamesService.addGame(gameData);
    res
      .status(201)
      .json({ message: 'Jeu ajouté avec succès', gameId: newGame.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un jeu existant
 */
export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await GamesService.updateGame(id, req.body);
    res.status(200).json({ message: `Jeu ${id} mis à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un jeu
 */
export const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await GamesService.deleteGame(id);
    res.status(200).json({ message: `Jeu ${id} supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
